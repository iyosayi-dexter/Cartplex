from django.db import models
from .utils import encode_email, send_welcome_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.


class NewsLetter(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    @property
    def uid(self):
        return encode_email(self.email)

    def __str__(self):
        return self.email


@receiver(post_save, sender=NewsLetter)
def news_letter_subscribe_handler(sender, instance, created, *args, **kwargs):
    if created:
        send_welcome_mail(instance)
