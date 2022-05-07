from django.contrib.auth.models import BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self , email , username , password=None):

        if not email:
            raise ValueError("Email is required")

        if not username :
            raise ValueError("Username is required")

        normalized_email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=normalized_email
        )
        user.set_password(password)
        user.save()
        return user

    def create_staffuser(self , email , username , password=None):
        user = self.create_user(email=email , username=username , password=password)
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self , email , username , password=None):
        user = self.create_user(email=email , username=username , password=password)
        user.superuser = True
        user.admin = True
        user.staff = True
        user.save(using=self._db)
        return user