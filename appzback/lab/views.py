from django.shortcuts import render, redirect, reverse
from django.db.models import Q

# Create your views here.
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from .pagination import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework import viewsets
from django.middleware import csrf
from django.shortcuts import get_object_or_404

###############################################################################
##                                                                           ##
##                               API VIEWS                                   ##
##                                                                           ##
###############################################################################


def index(request):
    return render(request, "index.html")

def room(request, room_name):
    return render(request, "room.html", {"room_name": room_name})

class TooltipeApiView(viewsets.ModelViewSet):
	queryset = Tooltipe.objects.all()
	serializer_class = TooltipeSerializer
	
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]

class GuideApiView(viewsets.ModelViewSet):
	queryset = Guide.objects.all()
	serializer_class = GuideSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]

class SectionApiView(viewsets.ModelViewSet):
	queryset = Section.objects.all()
	serializer_class = SectionSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]

class TopicApiView(viewsets.ModelViewSet):
	queryset = Topic.objects.all()
	serializer_class = TopicSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]

class DocumentationApiView(viewsets.ModelViewSet):
	queryset = Documentation.objects.all()
	serializer_class = DocumentationSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]


class BotAnswersListItemApiView(viewsets.ModelViewSet):
	queryset = BotAnswersListItem.objects.all()
	serializer_class = BotAnswersListItemSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]
	
class BotMessageApiView(viewsets.ModelViewSet):
	queryset = BotMessage.objects.all()
	serializer_class = BotMessageSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]

	def get_queryset(self):                                       
		return super().get_queryset().filter(user=self.request.user)

class RateMessageApiView(APIView):
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]
	def post(self, request, format=None):
		data = self.request.data
		message_id = data['message_id']
		rate = int(data['rating'])
		user = self.request.user

		try:
			message = BotMessage.objects.get(pk=message_id)

			if (rate > 0 and rate <= 10 and not message.is_user and message.user==request.user and user.is_authenticated):
				BotMessage.objects.filter(pk=1).update(rating = rate)#Int(rating))
				return Response({ 'rate': 'success' })
			else:
				return Response({ 'rate': 'error' })
		except:
			return Response({ 'error': 'Something went wrong' })

# class SendMessageApiView(APIView):
#     def post(self, request, format=None):
#     	data = self.request.data
#     	message = data['message']
#     	user = self.request.user
    	
#     	try:
#     		if user.is_authenticated:
#     			b = BotMessage(message=message, user=request.user, is_user=True)
#     			b.save()
#     			return Response({ 'send': 'success' })
#     		else:
#     			return Response({ 'send': 'error' })		
#     	except:
#     		return Response({ 'error': 'Something went wrong' })

class StartConvoAPIView(APIView):
	def post(self, request):
		#if request.user.is_authenticated:
		data = request.data
		username = data.pop('username')
		try:
			participant = User.objects.get(username=username)
		except User.DoesNotExist:
			return Response({'message': 'You cannot chat with a non existent user'})
		user_instance = get_object_or_404(User, pk=participant.pk)
		conversations = Conversation.objects.filter(initiator=user_instance)
		if conversations.count() > 0:
			print("Conversation with this user exists")
			serializer = ConversationSerializer(instance=conversations[0])
			return Response(serializer.data)
		else:
			print("Conversation with this user not exits")
			admin = User.objects.get(username="admin")
			conversation = Conversation.objects.create(initiator=request.user, receiver=admin)
			return Response(ConversationSerializer(instance=conversation).data)

# class GetConversation(APIView):
# 	def get(self, request, convo_id):
# 		print(request.user.id)
# 		conversation = Conversation.objects.filter(id=convo_id)
# 		if not conversation.exists():
# 			return Response({'message': 'Conversation does not exist'})
# 		else:
# 			serializer = ConversationSerializer(instance=conversation[0])
# 			return Response(serializer.data)

# class Conversations(APIView):
# 	def get(self, request):
# 		conversation_list = Conversation.objects.filter(Q(initiator=request.user) |
#                                                     Q(receiver=request.user))
# 		serializer = ConversationListSerializer(instance=conversation_list, many=True)
# 		return Response(serializer.data)

