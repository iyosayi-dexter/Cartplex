from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.core.mail import EmailMessage
from cartplex.settings import EMAIL_HOST_USER
import threading


class EmailActivateTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self , user , timestamp):
        return (six.text_type(user.id)+six.text_type(timestamp)+six.text_type(user.email_verified))

generate_token = EmailActivateTokenGenerator()

class EmailThread(threading.Thread):
    def __init__(self , email):
        self.email = email
        threading.Thread__init__(self)

    def run(self):
        self.email.send()


def send_activation_mail(user):
    current_site = 'localhost:3000'
    email_subject = 'Account activation on Cartplex'
    email_body =  render_to_string('auth/verify.html', {
        'user':user,
        'domain':current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.id)),
        'token': generate_token.make_token(user)
    })
    email = EmailMessage(subject=email_subject , body=email_body, from_email=EMAIL_HOST_USER , to=[user.email])
    EmailThread(email).start()
