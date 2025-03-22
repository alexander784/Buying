from django.conf import settings
from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    image = serializers.ImageField(required=False)

    def to_representation(self, instance):
        """Ensure absolute URL for images"""
        data = super().to_representation(instance)
        request = self.context.get("request")

        if instance.image:
            image_url = instance.image.url.lstrip('/')  # Remove leading "/"

            # Fix the incorrect "media/media" duplication
            if image_url.startswith("media/media/"):
                image_url = image_url.replace("media/media/", "media/")

            if request:
                data["image"] = request.build_absolute_uri(f"/{image_url}")  # Ensure full URL
            else:
                data["image"] = f"{settings.MEDIA_URL}{image_url}"

        return data

    class Meta:
        model = Product
        fields = '__all__'
