from .views import (
    ProductLatestView,
    ProductSaleView,
    ProducTrendingView,
    ProductDetailView,
    ProductRatingView
)
from django.urls import path


urlpatterns = [
    path('latest/' , ProductLatestView.as_view(), name='product_latest'),
    path('sale/' , ProductSaleView.as_view() , name='product_sale'),
    path('trending/' , ProducTrendingView.as_view() , name='product_trending'),
    path('detail/<str:slug>/' , ProductDetailView.as_view() , name='product_detail'),
    path('rating/' , ProductRatingView.as_view() , name='product_rating'),
]