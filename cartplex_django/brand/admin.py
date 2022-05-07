from django.contrib import admin
from .models import Brand

# Register your models here.
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name' , 'total_rating' , 'rating_score',)
    ordering = ('name' ,)


admin.site.register(Brand , BrandAdmin)