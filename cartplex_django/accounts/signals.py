from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from .utils import send_activation_mail

User = get_user_model()

@receiver(post_save , sender=User)
def user_created_handler(sender, instance , created , *args , **kwargs):
    if created:
        # send_activation_mail(instance)
        print(*args , **kwargs)
    else:
        print('Not created')
