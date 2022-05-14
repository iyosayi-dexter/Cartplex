from django.db import models
from category.models import Category
from brand.models import Brand
from django.core.validators import MaxValueValidator , MinValueValidator
from django.contrib.postgres.fields import ArrayField
from django.template.defaultfilters import slugify
from decimal import Decimal


# Limiting max discount of sale to 70% off
SALE_DISCOUNT_VALIDATOR = [MinValueValidator(0) , MaxValueValidator(70)]
RATING_VALIDATOR = [MinValueValidator(0) , MaxValueValidator(5)]

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    # Default Price is naira
    price = models.DecimalField(max_digits=8, decimal_places=2)

    views = models.PositiveIntegerField(default=0)
    slug = models.SlugField() # url for the product
    stock = models.PositiveIntegerField(default=0)

    # Product discount in percentage -> min 0%  - max 70%
    sale_discount=models.PositiveIntegerField(default=0 , validators=SALE_DISCOUNT_VALIDATOR)

    # Rating
    total_rating = models.PositiveIntegerField(default=0)
    rating_score = models.DecimalField(default=0.0 , max_digits=8 , decimal_places=1)
    rating = models.DecimalField(default=0.0 , validators=RATING_VALIDATOR , max_digits=2 , decimal_places=1)

    # only for accessories
    sizes = ArrayField(models.CharField(max_length=10) , blank=True , null=True)

    # Foreign keys
    category = models.ForeignKey(Category , on_delete=models.CASCADE , related_name='category')
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE , related_name='brand' , null=True , blank=True)
    main_thumbnail = models.ImageField(null=True , blank=True , upload_to='product/thumbnail')

    # TimeStamp
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}-{self.pk}"

    def save(self , *args , **kwargs):

        # auto slug generation
        slug = slugify(self.name)

        # ensuring unique slugs
        slug_queryset = Product.objects.filter(slug=slug)

        # get or items with specified slug
        # check if the length is 0
        if len(slug_queryset) == 0 or len(slug_queryset) >=1 and self in slug_queryset:
            self.slug = slug

        elif len(slug_queryset) >=1 and self not in slug_queryset:
            self.slug = f"{slug}-{self.pk}"

        # Calculate the rating
        total_rating_value = self.total_rating * 5
        # Getting the percentage of rating
        if total_rating_value > 0 :
            rating_percentage = (self.rating_score / total_rating_value) * 100
            # 5 = 100
            # product_rating = product_rating_percentage
            # product_rating = (5*product_rating_percentage)/100
            product_rating = round(Decimal(((5*rating_percentage)/100)), 1)
            self.rating = product_rating


        super(Product , self).save(*args , **kwargs)





class Thumbnail(models.Model):
    thumbnail = models.ImageField(upload_to='product/thumbnails' , null=True , blank=True)
    product= models.ForeignKey(Product , on_delete=models.CASCADE , related_name='product_thumbnail' , null=True , blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.thumbnail.url


class Banner(models.Model):
    cover = models.ImageField(upload_to='bannners/covers')
    product_url = models.ForeignKey(Product , on_delete=models.CASCADE , related_name='product_url')
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cover.url