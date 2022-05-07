from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from product.models import Product
from product.serializers import ProductListSerializer
from .models import Brand
from rest_framework import permissions

# Create your views here.
class BrandListView(APIView):
    def post(self , request):
        data = request.data
        brand = data.get('brand', None)

        if brand is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        brand_obj = Brand.objects.get(name = brand)
        queryset = Product.objects.filtere(brand = brand_obj)
        serializer = ProductListSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



# class BrandRateView(APIView):
#     permission_classes = (permissions.isAuthenticated,)
#     def post(self , request):
#         data = request.data
#         brand = data.get('brand' , None)
#         rating_score = data.get('rating_score' , None)

#         if brand is None or rating_score is None:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

#         queryset = Brand.objects.get(name=brand)
#         queryset.total_rating += 1
#         queryset.rating_score += int(rating_score)
#         queryset.save()
        # return Response(status=status.HTTP_200_OK)

