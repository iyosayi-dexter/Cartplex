from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=70)
    date_created = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name