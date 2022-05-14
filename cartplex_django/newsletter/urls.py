from django.urls import path
from .views import NewsLetterUnsubscribeView, NewsLetterSubscribeView

urlpatterns = [
    path('subscribe/', NewsLetterSubscribeView.as_view(),
         name='newsletter_subscribe'),
    path('unsubsribe/<str:uid>/', NewsLetterUnsubscribeView.as_view(),
         name='newsletter_subscribe')
]
