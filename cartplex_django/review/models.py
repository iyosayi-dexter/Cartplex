from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product

User = get_user_model()

class ProductReview(models.Model):
    product = models.ForeignKey(Product , on_delete=models.CASCADE , related_name='product')
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='product_user')
    review_detail = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)