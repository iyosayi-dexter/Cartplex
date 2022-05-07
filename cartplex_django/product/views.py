from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .models import Product , Thumbnail
from .serializers import ProductDetailSerializer , ProductListSerializer , ThumbnailSerializer
from rest_framework import status , permissions
from decimal import Decimal
from rest_framework.response import Response

# in ecommerce stores , you don't list out all the products , you categorize them
# newest producsts -> 10
# featured products -> 10
# best deals -> 9
# top rated -> 5
# product category view -> api pagination -> 20

# tasks to work on , i need a way to merge together -> Product image models and the actual Product

# Producst newly added
class ProductLatestView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.filter(sale_discount=0)[:10]
    serializer_class = ProductListSerializer

# Products with discounts
class ProductSaleView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.filter(sale_discount__gt=0)
    serializer_class = ProductListSerializer

# Treding products
class ProducTrendingView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.order_by('-views')[:5]
    serializer_class = ProductListSerializer

class ProductRatingView(APIView):
    permission_classes = (permissions.AllowAny ,)
    def get(self , request):
        self.permission_classes = (permissions.AllowAny,)
        queryset = Product.objects.all().order_by('-rating')[:10]
        serializer = ProductListSerializer(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self , request):
        data = request.data
        id = data.get('id' , None)
        rating_score = data.get('rating_score', None )
        if id is None or rating_score is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            id = id
            rating_score = Decimal(rating_score)
            if rating_score < 0 or rating_score > 5 :
                raise ValueError('Invalid score')
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            queryset = Product.objects.get(id=id)
            queryset.total_rating +=1
            queryset.rating_score = round(queryset.rating_score + rating_score , 1)
            queryset.save()
            return Response(status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)



# Product detail
class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self , request , slug):
        if slug is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try :
            product_queryset = Product.objects.get(slug=slug)
            thumbnail_queryset = Thumbnail.objects.filter(product=product_queryset)
            # increment the product views by 1
            product_queryset.views += 1
            product_queryset.save()
            serialized_product = ProductDetailSerializer(product_queryset)
            serialized_thumbnails = ThumbnailSerializer(thumbnail_queryset , many=True)

            product_data = {
                "product": serialized_product.data,
                "thumbnails":serialized_thumbnails.data
            }

            return Response(product_data, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)