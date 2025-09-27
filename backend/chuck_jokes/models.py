from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Joke(models.Model):
    external_id = models.CharField(
        max_length=30, primary_key=True, editable=False
    )  # api.chucknorris.io id
    text = models.TextField()
    categories = models.ManyToManyField(Category, related_name="jokes", blank=True)
    liked_by = models.ManyToManyField(User, related_name="liked_jokes", blank=True)
    like_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.external_id
