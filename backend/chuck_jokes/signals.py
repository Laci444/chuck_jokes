from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from .models import Joke


@receiver(m2m_changed, sender=Joke.liked_by.through)
def update_like_count(sender, instance, action, **kwargs):
    """
    Keep like_count in sync with liked_by relations.
    """
    if action in ["post_add", "post_remove", "post_clear"]:
        instance.like_count = instance.liked_by.count()
        instance.save(update_fields=["like_count"])
