from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password":{"write_only": True}}
    
    # this function is used to create new user after the serialzer above
    # passes down the data and it is good to go
    def create(self, validated_data):
        # ** =  splits the keyword argument and passes them in dictionary
        user = User.objects.create_user(**validated_data)
        print(user)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        field = ["id", "title","content", "created_at", "author"]
        extra_kwargs = {"authors": {"read_only": True}}
    