from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_account(self, username, password, **kwargs):
        if not username:
            raise ValueError('Users must have a valid username')

        if not password:
            raise ValueError('Users must have a valid password.')

        account = self.model(username=username)

        account.is_active = True

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, username, password, **kwargs):
        account = self.create_account(username, password, **kwargs)

        account.is_superuser = True

        account.save()

        return account


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=40, unique=True)
    # avatar = models.BinaryField(default=b'')
    total_points = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    new_user = models.BooleanField(default=True) # only logged in once
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    @property
    def is_staff(self):
        return self.is_superuser