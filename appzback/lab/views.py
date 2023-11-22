from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from .pagination import *
from .serializers import *
# from rest_framework.views import APIView
# from rest_framework.response import Response
from rest_framework import viewsets

###############################################################################
##                                                                           ##
##                               API VIEWS                                   ##
##                                                                           ##
###############################################################################


class TooltipeApiView(viewsets.ModelViewSet):
	queryset = Tooltipe.objects.all()
	serializer_class = TooltipeSerializer
	
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]

class GuideApiView(viewsets.ModelViewSet):
	queryset = Guide.objects.all()
	serializer_class = GuideSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]

class SectionApiView(viewsets.ModelViewSet):
	queryset = Section.objects.all()
	serializer_class = SectionSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]

class TopicApiView(viewsets.ModelViewSet):
	queryset = Topic.objects.all()
	serializer_class = TopicSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]

class DocumentationApiView(viewsets.ModelViewSet):
	queryset = Documentation.objects.all()
	serializer_class = DocumentationSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]


class BotAnswersListItemApiView(viewsets.ModelViewSet):
	queryset = BotAnswersListItem.objects.all()
	serializer_class = BotAnswersListItemSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]
	
class BotMessageApiView(viewsets.ModelViewSet):
	queryset = BotMessage.objects.all()
	serializer_class = BotMessageSerializer
	http_method_names = ['get']
	pagination_class = DefaultPagination
	authentication_classes=[SessionAuthentication]
	permission_classes=[IsAuthenticated]

	def get_queryset(self):                                       
		return super().get_queryset().filter(user=self.request.user)


	
class RateMessageApiView(APIView):
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

class SendMessageApiView(APIView):
    def post(self, request, format=None):
    	data = self.request.data
    	message = data['message']
    	user = self.request.user
    	
    	try:
    		if user.is_authenticated:
    			b = BotMessage(message=message, user=request.user, is_user=True)
    			b.save()
    			return Response({ 'send': 'success' })
    		else:
    			return Response({ 'send': 'error' })		
    	except:
    		return Response({ 'error': 'Something went wrong' })