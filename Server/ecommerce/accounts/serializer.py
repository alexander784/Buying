from rest_framework import serializers
from django.contrib.auth import get_user_model




User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'is_admin']

    def get_is_admin(self, obj):
        return obj.is_staff

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password']
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.filter(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            raise serializers.ValidationError('Invalid credentials')
    
        return {'user':user}
    