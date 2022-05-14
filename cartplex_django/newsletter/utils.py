from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_str, force_bytes
import threading


class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread__init__(self)

    def run(self):
        self.email.send()


def encode_email(email):
    # urlsafe_base64_encode takes in bytes as an argument and returns an encoded string
    return urlsafe_base64_encode(force_bytes(email))


def decode_email(encoded_str):
    # urlsafe_base64_decode takes in an encoded string as an argument and returns bytes
    return force_str(urlsafe_base64_decode(encoded_str))


def send_unsubscribe_sucessful_mail(user):
    pass


def send_welcome_mail(user):
    pass
