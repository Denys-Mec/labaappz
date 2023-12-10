from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:room_name>/", views.room, name="room"),
    #path('', Conversations.as_view()),
    #path('<int:convo_id>/', GetConversation.as_view()),
    #path('start/', StartConvoAPIView.as_view()),
]