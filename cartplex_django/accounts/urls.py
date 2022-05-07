from django.urls import path
from .views import EmailVerificationView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from .views import AuthTokenObtainPairView , SignUpView

urlpatterns = [
    path('verify_mail/' , EmailVerificationView.as_view() , name='verify_mail'),
    path('token/' , AuthTokenObtainPairView.as_view() , name='token_obtain_pair'),
    path('token/refresh/' , TokenRefreshView.as_view() , name='token_refresh'),
    path('signup/', SignUpView.as_view() ,name='sign_up_view')
]