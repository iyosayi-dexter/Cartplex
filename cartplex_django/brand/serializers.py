from rest_framework import serializers
from .models import Brand

class BrandSerializer(serializers.ModelSerializer):
    date_added = serializers.DateTimeField(format='%b %d %Y')
    class Meta:
        model = Brand
        fields = '__all__'