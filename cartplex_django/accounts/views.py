from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.encoding import force_str , DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from .utils import generate_token
from rest_framework import permissions

User = get_user_model()

class AuthTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls , user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['email_verified'] = user.email_verified

        return token

class AuthTokenObtainPairView(TokenObtainPairView):
    serializer_class = AuthTokenObtainPairSerializer

# Create your views here.
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self , request):
        data = request.data
        username = data.get('username' , None)
        password = data.get('password' , None)
        re_password = data.get('password' , None)
        email = data.get('email' , None)

        if username is None or password is None or re_password is None or email is None:
            context = {
                "Invalid form data"
            }
            return Response(context , status=status.HTTP_400_BAD_REQUEST)

        if password != re_password:
            context = {
                "Passwords do not match"
            }
            return Response(context , status=status.HTTP_400_BAD_REQUEST)

        # check if a user with this email already exists
        try:
            User.objects.get(email=email)
            context = {
                'success':False,
                'description':'A user with this email already exists'
            }
            return Response(context , status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            # if a user does not exist create one
            User.objects.create(username=username , password=password , email=email)
            context = {
                'success':True,
                'description':'Account Successfully created , proceed to login'
            }
            return Response(context, status=status.HTTP_200_OK)



class EmailVerificationView(APIView):
    def post(self , request):
        data = request.data
        uidb64 = data.get('uidb64' , None)
        token = data.get('token' , None)
        if token is None or uidb64 is None :
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try :
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=uid)
            if user and generate_token.check_token(user , token):
                user.email_verified = True
                user.save()
                context = {
                    'success':True,
                    'description':'Email successfully verified'
                }
                return Response(context , status=status.HTTP_200_OK)
        except Exception as E:
            return Response(status=status.HTTP_400_BAD_REQUEST)



