from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator


# Create your models here.
# chat-bot (list and chat)
# wiki 
# guide (element, text)
# tooltipe (element, text)


class Conversation(models.Model):
    initiator = models.ForeignKey (User, on_delete=models.SET_NULL, null=True, related_name="convo_starter")
    receiver = models.ForeignKey (User, on_delete=models.SET_NULL, null=True, related_name="convo_participant")
    start_time = models.DateTimeField(auto_now_add=True, null=True)

# class Message(models.Model):
#     sender = models.ForeignKey(User, on_delete=models.SET_NULL,
#                               null=True, related_name='message_sender')
#     text = models.CharField(max_length=200, blank=True)
#     attachment = models.FileField(blank=True)
#     conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE,)
#     time = models.DateTimeField(auto_now_add=True, null=True)

#     class Meta:
#         ordering = ('-timestamp',)

#Messages
class BotMessage(models.Model):

    message = models.TextField(default='')
    is_user = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    rating = models.PositiveIntegerField(default = 0, validators=[MaxValueValidator(10)])
    time = models.DateTimeField(auto_now_add=True, null=True)
    conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('-time',)

    def __str__(self):
        return self.message
#

class Section(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name
   

class Topic(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name + "(" + self.section.name + ")"

class BotAnswersListItem(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, null=False)
    title = models.CharField(max_length=150, default='title')
    question = models.ForeignKey(BotMessage, on_delete=models.CASCADE, null=False, related_name='question')
    answer = models.ForeignKey(BotMessage, on_delete=models.CASCADE, null=False, related_name='answer')
    
    def __str__(self):
        return self.title

class Guide(models.Model):
    element_name = models.CharField(max_length=100)
    prew_element_name = models.CharField(max_length=100, null=True)
    next_element_name = models.CharField(max_length=100, null=True)
    content = models.CharField(max_length=500)
    place = models.CharField(max_length=250, default='main', null=True)
    
    def __str__(self):
        return self.element_name

#
class Tooltipe(models.Model):
    element_name = models.CharField(max_length=100)
    title = models.CharField(max_length=50, null=True)
    tooltipe = models.CharField(max_length=500)

    def __str__(self):
        return self.element_name

class Documentation(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, null=False)
    title = models.CharField(max_length=150, default='title')
    text = models.TextField(default='')

    def __str__(self):
        return self.title