from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from django.contrib.auth.hashers import make_password

from .models import Account
from .permissions import IsAccountOwner
from .serializers import (
    AccountSerializer,
)


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            if 'password' not in serializer.validated_data:
                return Response({
                    'error': 'Password required for creating account.'
                }, status=status.HTTP_400_BAD_REQUEST)

            if serializer.validated_data['password'] != request.data['password2']:
                return Response({
                    'error': 'Passwords do not match.'
                }, status=status.HTTP_400_BAD_REQUEST)


            Account.objects.create_account(**serializer.validated_data)
            serializer.validated_data.pop('password', None)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'error': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        if 'password' in self.request.data:
            password = make_password(self.request.data['password'])
        serializer.save(password=password)

    def perform_update(self, serializer):
        update_acct = {}
        if 'password' in self.request.data:
            update_acct['password'] = make_password(self.request.data['password'])
        if 'total_points' in self.request.data:
            update_acct['total_points'] = self.request.data['total_points']

        serializer.save(**update_acct)
