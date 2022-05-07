from django.contrib import admin
from .models import Thumbnail , Product

class ThumbnailInline(admin.StackedInline):
    model = Thumbnail

class ProductAdmin(admin.ModelAdmin):
    inlines = [ThumbnailInline]
    list_display = ('name' , 'price' , 'sale_discount',)
    exclude = ('slug', 'views' , 'total_rating', 'rating_score', 'rating',)

admin.site.register(Product , ProductAdmin)
