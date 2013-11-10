from django.views.generic import TemplateView
from rest_framework.response import Response
from django.core.mail.message import EmailMessage
from rest_framework import generics, views

import serializers


class Index(TemplateView):
    template_name = 'index.html'


class Contact(generics.CreateAPIView):
    serializer_class = serializers.ContactSerializer

    def create(self, request):
        serializer = serializers.ContactSerializer(request.DATA)
        email = EmailMessage(
            serializer.data['subject'],
            serializer.data['message'],
            'noreply@raphaelcruzeiro.com',
            ['raphaelcruzeiro@raphaelcruzeiro.com'],
            headers = { 'Reply-To' : serializer.data['email'] }
        )
        email.send()
        return Response({
            'status' : 'ok'
        })
