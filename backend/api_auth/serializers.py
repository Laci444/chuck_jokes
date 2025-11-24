from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        min_length=8,
        trim_whitespace=True,
    )

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
