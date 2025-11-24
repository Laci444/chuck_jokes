from unittest.mock import MagicMock, patch

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from .models import Category, Joke
from .serializers import JokeSerializer, UserSerializer
from .views import LikesViewSet


class CategoryModelTest(TestCase):
    def test_str_method(self):
        cat = Category.objects.create(name="nerdy")
        self.assertEqual(str(cat), "nerdy")


class JokeModelTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            username="john", email="john@chuck.com", password="123"
        )
        self.user2 = User.objects.create_user(
            username="mary", email="mary@chuck.com", password="123"
        )
        self.joke = Joke.objects.create(external_id="abc123", text="A funny joke")

    def test_str_method(self):
        self.assertEqual(str(self.joke), "abc123")

    def test_like_count_increment_decrement(self):
        # Add likes
        self.joke.liked_by.add(self.user1)
        self.joke.refresh_from_db()
        self.assertEqual(self.joke.like_count, 1)

        self.joke.liked_by.add(self.user2)
        self.joke.refresh_from_db()
        self.assertEqual(self.joke.like_count, 2)

        # Remove like
        self.joke.liked_by.remove(self.user1)
        self.joke.refresh_from_db()
        self.assertEqual(self.joke.like_count, 1)

        # Clear likes
        self.joke.liked_by.clear()
        self.joke.refresh_from_db()
        self.assertEqual(self.joke.like_count, 0)

    def test_category_assignment(self):
        cat1 = Category.objects.create(name="nerdy")
        cat2 = Category.objects.create(name="funny")
        self.joke.categories.add(cat1, cat2)
        self.assertEqual(list(self.joke.categories.all()), [cat1, cat2])


class JokeSerializerTest(TestCase):
    def setUp(self):
        self.cat = Category.objects.create(name="nerdy")
        self.joke = Joke.objects.create(external_id="abc123", text="A funny joke")
        self.joke.categories.add(self.cat)

    def test_serialization(self):
        serializer = JokeSerializer(self.joke)
        data = serializer.data
        self.assertEqual(data["external_id"], "abc123")
        self.assertEqual(data["text"], "A funny joke")
        self.assertEqual(data["like_count"], 0)
        self.assertEqual(len(data["categories"]), 1)
        self.assertEqual(data["categories"][0]["name"], "nerdy")


class UserSerializerTest(TestCase):
    def test_serialization(self):
        user = User.objects.create_user(
            username="john", email="john@chuck.com", password="123"
        )
        serializer = UserSerializer(user)
        data = serializer.data
        self.assertIn("id", data)
        self.assertIn("username", data)
        self.assertEqual(data["username"], "john")


class LikesViewSetTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            username="john", email="john@chuck.com", password="123"
        )
        self.joke = Joke.objects.create(external_id="abc123", text="A funny joke")
        self.view = LikesViewSet.as_view(
            {
                "get": "list",
                "post": "create",
                "delete": "destroy",
            }
        )

    def test_list_likes_empty(self):
        request = self.factory.get("/")
        request.user = self.user
        response = LikesViewSet().list(request, id=self.joke.external_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_create_like_existing_joke(self):
        request = self.factory.post("/")
        request.user = self.user
        response = LikesViewSet().create(request, id=self.joke.external_id)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.joke.refresh_from_db()
        self.assertEqual(self.joke.like_count, 1)

    def test_create_like_already_liked(self):
        self.joke.liked_by.add(self.user)
        self.joke.refresh_from_db()
        request = self.factory.post("/")
        request.user = self.user
        response = LikesViewSet().create(request, id=self.joke.external_id)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    @patch("chuck_jokes.views.requests.get")
    def test_create_like_external_joke(self, mock_get):
        # Mock the Chuck API response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "value": "New joke text",
            "categories": ["nerdy", "funny"],
        }
        mock_get.return_value = mock_response

        request = self.factory.post("/")
        request.user = self.user
        response = LikesViewSet().create(request, id="external123")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        joke = Joke.objects.get(external_id="external123")
        self.assertEqual(joke.text, "New joke text")
        self.assertEqual(joke.categories.count(), 2)
        self.assertIn(self.user, joke.liked_by.all())

    def test_destroy_like(self):
        self.joke.liked_by.add(self.user)
        self.joke.refresh_from_db()
        request = self.factory.delete("/")
        request.user = self.user
        response = LikesViewSet().destroy(request, id=self.joke.external_id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.joke.refresh_from_db()
        self.assertEqual(self.joke.like_count, 0)

    def test_destroy_like_not_liked(self):
        request = self.factory.delete("/")
        request.user = self.user
        response = LikesViewSet().destroy(request, id=self.joke.external_id)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
