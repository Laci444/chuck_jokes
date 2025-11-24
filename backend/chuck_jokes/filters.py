import django_filters

from .models import Joke


class JokeFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(
        field_name="categories__name", lookup_expr="iexact"
    )

    class Meta:
        model = Joke
        fields = ["category"]
