from django.contrib import admin

from .models import Category, Joke

# Register your models here.
admin.site.register(Joke)
admin.site.register(Category)
