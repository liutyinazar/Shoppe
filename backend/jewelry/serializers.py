from rest_framework import serializers
from .models import Jewelry, JewelryCategory, JewelryImage, Review

class JewelryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JewelryCategory
        fields = '__all__'

class JewelryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = JewelryImage
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class JewelryListSerializer(serializers.ModelSerializer):
    category = JewelryCategorySerializer()
    images = JewelryImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Jewelry
        fields = '__all__'

