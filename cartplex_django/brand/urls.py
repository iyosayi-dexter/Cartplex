from .views import BrandListView
from django.urls import path

urlpatterns = [
    path('list/', BrandListView.as_view() , name='product_brand')
]