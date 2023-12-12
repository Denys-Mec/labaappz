import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from lab.models import BotMessage
from lab.models import Conversation

class ChatConsumer(WebsocketConsumer): 
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        user = self.scope['user']
        print(user)

        # Перевірка, чи користувач аутентифікований
        # if not user.is_authenticated:
        #     DenyConnection("Connection denied due to user isn't logged in.")
        # else:
        #     initiator = Conversation.objects.get(initiator="user.username")
        #     receiver = Conversation.objects.get(receiver="user.username")

        #     if not (initiator or receiver):
        #         DenyConnection("User connected to wrong conversation.")

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Отримання поля "staff status" користувача
            #staff_status = user.is_staff  # Це приклад, можливо, ваше поле має іншу назву

            # Використання поля "staff status"
        # if staff_status:
        #         # Робота з staff status, якщо користувач - персонал
        #     pass
        # else:
        #     if User.objects.get(username = user.username):
        #         pass

        # BotMessage.objects.create(conversation_id=int(room_name), message = message, is_user = not staff_status, user = user)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))