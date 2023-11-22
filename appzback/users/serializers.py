from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
	username = serializers.SerializerMethodField('getUserName')
	email = serializers.SerializerMethodField('getUserEmail')

	def getUserName(self, item):
		return item.user.username

	def getUserEmail(self, item):
		return item.user.email

	class Meta:
		model = Profile
		fields = ['username', 'email', 'role', 'is_finished_guide']