# Generated by Django 4.0.3 on 2022-04-24 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_remove_product_thumbnail_product_main_thumbnail_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating_score',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='total_rating',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
