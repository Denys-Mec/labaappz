from rest_framework import serializers
from .models import *



class TooltipeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tooltipe
		fields = '__all__'

class GuideSerializer(serializers.ModelSerializer):
	class Meta:
		model = Guide
		fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Section
		fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
	section_name = serializers.SerializerMethodField('getSection')

	def getSection(self, item):
		return item.section.name

	class Meta:
		model = Topic
		fields = ['id', 'section_name', 'name']

class DocumentationSerializer(serializers.ModelSerializer):
	section_name = serializers.SerializerMethodField('getSection')
	topic_name = serializers.SerializerMethodField('getTopic')

	def getSection(self, item):
		return item.topic.section.name

	def getTopic(self, item):
		return item.topic.name

	class Meta:
		model = Documentation
		fields = ['id', 'section_name', 'topic_name', 'title', 'text']

class BotAnswersListItemSerializer(serializers.ModelSerializer):
	question = serializers.SerializerMethodField('getQuestion')
	answer = serializers.SerializerMethodField('getAnswer')
	section_name = serializers.SerializerMethodField('getSection')
	topic_name = serializers.SerializerMethodField('getTopic')

	def getQuestion(self, item):
		return item.question.message

	def getAnswer(self, item):
		return item.answer.message

	def getSection(self, item):
		return item.topic.section.name

	def getTopic(self, item):
		return item.topic.name

	class Meta:
		model = BotAnswersListItem
		fields = ['id', 'section_name', 'topic_name', 'title', 'question', 'answer']

class BotMessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = BotMessage
		fields = ['id', 'message', 'is_user', 'rating']

class RateMessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = BotMessage
		fields = ['rating']
	