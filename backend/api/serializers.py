from rest_framework import serializers

from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = (
            'id',
            'username',
            'created_at',
            'updated_at',
            'is_mentor',
            'is_startup_owner',
            'is_contractor',
            'password',
            'new_user'
            )

        read_only_fields = ('created_at', 'updated_at', )
