from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Account

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        return token

    def validate(self, validate_data):
        data =   super().validate(validate_data)
        refresh =   self.get_token(self.user)
        data['refresh'] =   str(refresh)
        data['access'] =   str(refresh.access_token)
        data['uuid'] =   self.user.uuid
        data['email'] =   self.user.email
        data['username'] =   self.user.username
        data['first_name'] =   self.user.first_name
        data['last_name'] =   self.user.last_name
        
        currentUser =   Account.objects.get(
            uuid = self.user.uuid )
        currentUser.save()
        return data

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

    def create(self, validated_data):
        account = Account.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            password = make_password(validated_data['password'])
        )
        return account

class AccountListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'