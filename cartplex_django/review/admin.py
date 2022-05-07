from django.contrib import admin
from .models import ProductReview

# Register your models here.
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user' , 'date_added')
    ordering = ('user',)

admin.site.register(ProductReview , ReviewAdmin)