# Generated by Django 4.0.3 on 2022-05-10 11:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0016_remove_product_featured'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cover', models.ImageField(upload_to='bannners/covers')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('product_url', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_url', to='product.product')),
            ],
        ),
    ]
