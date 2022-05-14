from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from .models import NewsLetter
from .utils import decode_email, send_unsubscribe_sucessful_mail


class NewsLetterSubscribeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        email = data.get('email', None)
        if email is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        email = email.strip().lower()

        try:
            NewsLetter.objects.get(email=email)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except NewsLetter.DoesNotExist:
            NewsLetter.objects.create(email=email)
            return Response(status=status.HTTP_200_OK)


class NewsLetterUnsubscribeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, uid):
        if uid is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        email = decode_email(uid)

        try:
            newsletter_user = NewsLetter.objects.get(email=email)
            send_unsubscribe_sucessful_mail(newsletter_user)
            newsletter_user.delete()
            return Response(status=status.HTTP_200_OK)

        except NewsLetter.DoesNotExist:

            return Response(status=status.HTTP_400_BAD_REQUEST)
