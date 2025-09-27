from django.apps import AppConfig


class ChuckJokesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "chuck_jokes"

    def ready(self):
        from . import signals  # noqa
