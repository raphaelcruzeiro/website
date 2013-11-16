from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    subject = serializers.CharField(max_length=150, required=True)
    message = serializers.CharField(required=True)
