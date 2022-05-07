from .views import CategoryListView
from django.urls import path

urlpatterns = [
    path('list/' , CategoryListView.as_view() , name='product_category')
]