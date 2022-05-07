from .models import Product , Thumbnail
from rest_framework import serializers

class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    brand = serializers.StringRelatedField()
    date_added = serializers.DateTimeField(format='%b %d %Y')
    class Meta:
        model= Product
        fields =  ('id' , 'name' , 'price' , 'slug' , 'sale_discount' , 'description', 'main_thumbnail', 'rating', 'sizes' , 'category' , 'brand' , 'date_added',)

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id' , 'name' , 'price' , 'slug' , 'sale_discount' , 'main_thumbnail', 'rating',)

class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = ('id' , 'thumbnail')