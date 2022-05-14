from django.contrib import admin
from .models import NewsLetter


class NewsLetterAdmin(admin.ModelAdmin):
    list_display = ('email', 'date_joined',)


admin.site.register(NewsLetter, NewsLetterAdmin)
