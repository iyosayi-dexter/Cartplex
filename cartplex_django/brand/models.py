from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(max_length=200)
    total_rating = models.PositiveIntegerField()
    rating_score = models.PositiveIntegerField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name