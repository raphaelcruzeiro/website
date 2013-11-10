from django.conf.urls import patterns, include, url
import views
import api_urls

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'website.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.Index.as_view()),
    url(r'^api/', include(api_urls)),
    url(r'^admin/', include(admin.site.urls)),
)
