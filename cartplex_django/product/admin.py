from django.contrib import admin
from .models import Banner, Thumbnail , Product

class ThumbnailInline(admin.StackedInline):
    model = Thumbnail

class ProductAdmin(admin.ModelAdmin):
    inlines = [ThumbnailInline]
    list_display = ('name' , 'price' , 'sale_discount',)
    exclude = ('slug', 'views' , 'total_rating', 'rating_score', 'rating',)

admin.site.register(Product , ProductAdmin)

class BannerAdmin(admin.ModelAdmin):
    list_display = ('product_url' , 'cover' , 'date_added' ,)

admin.site.register(Banner , BannerAdmin)