from django.urls import include, path
from rest_framework import routers

from .views import JokeViewSet, LikesViewSet

router = routers.SimpleRouter()
router.register("jokes", JokeViewSet)

joke_likes = LikesViewSet.as_view(
    {
        "get": "list",
        "post": "create",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("", include(router.urls)),
    path("jokes/<id>/likes/", joke_likes),
]
