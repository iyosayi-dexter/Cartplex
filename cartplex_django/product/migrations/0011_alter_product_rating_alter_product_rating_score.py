# Generated by Django 4.0.3 on 2022-04-25 09:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0010_alter_product_rating_alter_product_rating_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.DecimalField(decimal_places=1, max_digits=1, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
        migrations.AlterField(
            model_name='product',
            name='rating_score',
            field=models.DecimalField(decimal_places=1, max_digits=5),
        ),
    ]
