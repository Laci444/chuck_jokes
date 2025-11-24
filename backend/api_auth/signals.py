from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models.signals import pre_save
from django.dispatch import receiver


@receiver(pre_save, sender=User)
def enforce_unique_email(sender, instance, **kwargs):
    if User.objects.filter(email=instance.email).exclude(pk=instance.pk).exists():
        raise IntegrityError("A user with this email already exists.")
