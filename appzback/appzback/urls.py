from django.contrib import admin
from django.urls import include, path
from rest_framework import routers


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
# router.register(r'api/messages/rate', RateMessageApiView)
router.register(r'api/accounts/profile', ProfileApiView)

urlpatterns = [
    path("chat/", include("lab.urls")),
	path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # path('api/accounts', include('users.urls')),
    path('api/accounts/login', LoginView.as_view()),
    path('api/accounts/logout', LogoutView.as_view()),
    path('api/accounts/authenticated', CheckAuthenticatedView.as_view()),
    path('api/accounts/csrf_cookie', GetCSRFToken.as_view()),
<<<<<<< HEAD
    path('api/messages/rate', RateMessageApiView.as_view()),
    path('api/messages/send', SendMessageApiView.as_view()),
=======
    #path('api/messages/rate', RateMessageApiView.as_view()),
    #path('api/messages/send', SendMessageApiView.as_view())
    path('api/conversations', Conversations.as_view()),
    path('api/<int:convo_id>/', GetConversation.as_view()),
    path('api/start/', StartConvoAPIView.as_view()),
    path('api/users/', GetUserLists.as_view())
>>>>>>> 3e3dbc7 (+ added working sockets with html pages(needed for test))
]
