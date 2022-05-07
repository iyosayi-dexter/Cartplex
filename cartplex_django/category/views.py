from rest_framework.views import APIView
from rest_framework import status , permissions
from rest_framework.response import Response
from .models import Category
from product.models import Product
from product.serializers import ProductListSerializer
from .serializers import CategorySerializer

class CategoryListView(APIView):
    permission_classes = (permissions.AllowAny ,)
    def get(self , request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self , request):
        data = request.data
        category = data.get('category', None)

        if category is None :
            return Response(status=status.HTTP_400_BAD_REQUEST)

        category_obj = Category.objects.get(name=category)
        queryset = Product.objects.filter(category=category_obj)
        serializer = ProductListSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)