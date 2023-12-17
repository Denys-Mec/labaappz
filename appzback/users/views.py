from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from rest_framework import viewsets


# for login/logout
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib import auth
from django.middleware import csrf

class ProfileApiView(viewsets.ModelViewSet):
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer
	http_method_names = ['get']
	authentication_classes=[TokenAuthentication]
	permission_classes=[IsAuthenticated]
	pagination_class = None
	def get_queryset(self):                                       
		return super().get_queryset().filter(user=self.request.user)

class CheckAuthenticatedView(APIView):
    authentication_classes=[TokenAuthentication]
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })

class AllUsersApiView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UsersAllSerializer
    http_method_names = ['get']
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]