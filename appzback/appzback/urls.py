from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

from lab.views import *
from users.views import *

router = routers.DefaultRouter()
router.register(r'api/tooltipe', TooltipeApiView)
router.register(r'api/guide', GuideApiView)
router.register(r'api/section', SectionApiView)
router.register(r'api/topic', TopicApiView)
router.register(r'api/documentation', DocumentationApiView)
router.register(r'api/top_questions', BotAnswersListItemApiView)
router.register(r'api/messages', BotMessageApiView)
#router.register(r'api/messages/rate', RateMessageApiView)
router.register(r'api/accounts/profile', ProfileApiView)


urlpatterns = [
    #path("chat/", include("lab.urls")),
	path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # path('api/accounts', include('users.urls')),
    path('api/accounts/authenticated', CheckAuthenticatedView.as_view()),
    path('api/messages/rate', RateMessageApiView.as_view()),
    #path('api/messages/send', SendMessageApiView.as_view())
    #path('api/conversations', Conversations.as_view()),
    #path('api/<int:convo_id>/', GetConversation.as_view()),
    path('api/chat/', StartConvoAPIView.as_view()),
    path('api/get-token', obtain_auth_token)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_URL)
    