import requests
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from .filters import JokeFilter
from .models import Category, Joke
from .serializers import JokeSerializer, UserSerializer


class JokeViewSet(ReadOnlyModelViewSet):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer
    lookup_field = "external_id"
    ordering = ["-like_count"]
    filterset_class = JokeFilter


class LikesViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, id):
        joke = get_object_or_404(Joke, external_id=id)
        users = joke.liked_by.all()
        return Response(UserSerializer(users, many=True).data)

    def create(self, request, id):
        joke = Joke.objects.filter(external_id=id).first()
        if joke and joke.liked_by.filter(id=request.user.id).exists():
            return Response({"error": "Already liked"}, status=status.HTTP_409_CONFLICT)

        if not joke or not joke.text:
            # get joke data from api
            response = requests.get(f"https://api.chucknorris.io/jokes/{id}")
            if response.status_code != 200:
                return Response(
                    {"error": "Joke not found"}, status=status.HTTP_404_NOT_FOUND
                )
            data = response.json()

            categories = [
                Category.objects.get_or_create(name=cat)[0]
                for cat in data.get("categories", [])
            ]

            joke = Joke.objects.create(
                external_id=id,
                text=data.get("value", ""),
            )

            joke.categories.set(categories)

        joke.liked_by.add(request.user)
        return Response({"like_count": joke.like_count}, status=status.HTTP_201_CREATED)

    def destroy(self, request, id):
        joke = get_object_or_404(Joke, external_id=id)
        if not joke.liked_by.filter(id=request.user.id).exists():
            return Response(
                {"error": "Not liked yet"}, status=status.HTTP_404_NOT_FOUND
            )
        joke.liked_by.remove(request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)
