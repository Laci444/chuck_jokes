from django.contrib.auth import get_user_model
from django.db import IntegrityError

# tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .serializers import RegisterSerializer

User = get_user_model()


class RegisterSerializerTest(TestCase):
    def test_create_user_success(self):
        data = {
            "username": "john",
            "email": "john@example.com",
            "password": "strongpassword",
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.username, "john")
        self.assertEqual(user.email, "john@example.com")
        # Password is hashed
        self.assertNotEqual(user.password, "strongpassword")
        self.assertTrue(user.check_password("strongpassword"))

    def test_create_user_duplicate_email_raises_integrityerror(self):
        User.objects.create_user(
            username="existing", email="dup@example.com", password="12345678"
        )
        data = {
            "username": "newuser",
            "email": "dup@example.com",
            "password": "anotherpassword",
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        # Saving should raise IntegrityError because of the signal
        with self.assertRaises(IntegrityError):
            serializer.save()


class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("register")

    def test_register_user_success(self):
        data = {
            "username": "alice",
            "email": "alice@example.com",
            "password": "strongpassword",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username="alice")
        self.assertEqual(user.email, "alice@example.com")
        self.assertTrue(user.check_password("strongpassword"))

    def test_register_user_duplicate_email(self):
        User.objects.create_user(
            username="bob", email="bob@example.com", password="12345678"
        )
        data = {
            "username": "newbob",
            "email": "bob@example.com",
            "password": "anotherpassword",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
