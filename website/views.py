from django.views.generic import TemplateView
from rest_framework.response import Response
from django.core.mail.message import EmailMessage
from rest_framework import generics, views

import serializers


class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        import os
        import random
        from settings import STATIC_ROOT, STATICFILES_DIRS, DEBUG, STATIC_URL
        static_dir = STATIC_ROOT

        if DEBUG:
            static_dir = STATICFILES_DIRS[0]

        covers = ['%scss/covers/%s' % (STATIC_URL, c) for c in os.listdir(os.path.join(static_dir, 'css/covers')) if c.endswith('.css')]

        context = super(Index, self).get_context_data(**kwargs)
        if 'cover' in self.request.GET:
            css_name = '%s.css' % self.request.GET['cover']
            if css_name in covers:
                context['cover'] = css_name
                return context

        random.shuffle(covers)
        context['cover'] = covers[0]
        return context


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
