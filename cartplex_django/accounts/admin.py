from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm , UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

# Register your models here

User = get_user_model()

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = (
        'email' , 'username' , 'email_verified',
    )
    list_filter = ('email' , 'username',)
    fieldsets = (
        (None , {'fields':('email' , 'username' , 'password')}),
        ('Permissions' , {'fields': ('staff' , 'superuser' , 'admin' , 'email_verified',)})
    )
    add_fieldsets = (
        (None, {
            'classes':('wide',),
            'fields':('email' , 'username' , 'password1' , 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.unregister(Group)
admin.site.register(User , UserAdmin)