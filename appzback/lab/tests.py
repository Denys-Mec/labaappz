from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .models import *

class  MessageTestCase(APITestCase): # перевірка повідомлень (чат-боту)
    def test_get_chat(self): # перевірка отримання історії чату
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        for i in range(9):
            BotMessage.objects.create(is_user=True, user=user, message='message {}'.format(i), rating=0)

        res = self.client.get('/api/messages/')
        #print(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data['results']), len(BotMessage.objects.all()))

    '''def test_send_message(self):
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        data = {'message' : 'hello'}
        res = self.client.post('/api/messages/send', data)
        print(res.data)'''

    def test_rate_message(self): # перевірка можливості поставити оцінку на відповідь
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        msg = BotMessage.objects.create(is_user=False, user=user, message='hello', rating=0)

        data = {'message_id':'{}'.format(msg.id), 'rating':'8'}
        res = self.client.post('/api/messages/rate', data)
        #print(res.data)
        self.assertEqual(res.data, {'rate':'success'})


    def test_rate_own_message(self): # перевірка на відсутність можливості оцінити власне повідомлення
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        msg = BotMessage.objects.create(is_user=True, user=user, message='hello', rating=0)

        data = {'message_id': '{}'.format(msg.id), 'rating': '8'}
        res = self.client.post('/api/messages/rate', data)
        #print(res.data)
        self.assertEqual(res.data, {'rate': 'error'})

    def test_rate_bounds(self): # перевірка на допустимі межі оцінки
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        msg = BotMessage.objects.create(is_user=False, user=user, message='hello', rating=0)

        data1 = {'message_id': '{}'.format(msg.id), 'rating': '11'}
        res1 = self.client.post('/api/messages/rate', data1)
        # print(res1.data)
        self.assertEqual(res1.data, {'rate': 'error'})

        data2 = {'message_id': '{}'.format(msg.id), 'rating': '-1'}
        res2 = self.client.post('/api/messages/rate', data2)
        # print(res2.data)
        self.assertEqual(res2.data, {'rate': 'error'})
    def test_privacy(self): # перевірка на відсутність можливості читати чужі повідомлення
        user = get_user_model().objects.create_user(username='denys', password='denys')
        user2 = get_user_model().objects.create_user(username='yust', password='yust')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        BotMessage.objects.create(is_user=False, user=user, message='hello', rating=0)
        BotMessage.objects.create(is_user=False, user=user2, message='hello', rating=0)

        res = self.client.get('/api/messages/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data['results']), 1)
    def test_access(self): # перевірка на доступ без авторизації
        user = get_user_model().objects.create_user(username='denys', password='denys')

        for i in range(9):
            BotMessage.objects.create(is_user=True, user=user, message='message {}'.format(i), rating=0)

        res = self.client.get('/api/messages/')
        # print(res.data)
        self.assertEqual(res.status_code, 401) # not authenticated

class ModelsTestCase(APITestCase): # перевірка моделей бд на безпеку (доступ після авторизації) та на можливість опрацьовувати get запити
    def test_section(self):
        Section.objects.create(name='section')

        res = self.client.get('/api/section/')
        # print(res.data)
        self.assertEqual(res.status_code, 401)  # not authenticated

        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        res = self.client.get('/api/section/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)  # authenticated
        self.assertEqual(len(res.data['results']), 1)

    def test_topic(self):
        s = Section.objects.create(name='section')
        Topic.objects.create(name='topic', section=s)

        res = self.client.get('/api/topic/')
        # print(res.data)
        self.assertEqual(res.status_code, 401)  # not authenticated

        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        res = self.client.get('/api/topic/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)  # authenticated
        self.assertEqual(len(res.data['results']), 1)

    def test_guide(self):
        Guide.objects.create(element_name='button', content='press btn')

        res = self.client.get('/api/guide/')
        # print(res.data)
        self.assertEqual(res.status_code, 401)  # not authenticated

        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        res = self.client.get('/api/guide/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)  # authenticated
        self.assertEqual(len(res.data['results']), 1)

    def test_documentation(self):
        s = Section.objects.create(name='section')
        t = Topic.objects.create(name='topic', section=s)
        Documentation.objects.create(topic=t, title='title', text='text')

        res = self.client.get('/api/documentation/')
        # print(res.data)
        self.assertEqual(res.status_code, 401)  # not authenticated

        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        res = self.client.get('/api/documentation/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)  # authenticated
        self.assertEqual(len(res.data['results']), 1)

    def test_bot_list(self):
        s = Section.objects.create(name='section')
        t = Topic.objects.create(name='topic', section=s)

        user = get_user_model().objects.create_user(username='denys', password='denys')
        q = BotMessage.objects.create(user=user, is_user=True, message="hey, 404 bro?")
        a = BotMessage.objects.create(user=user, is_user=False, message="we use kyivstar")
        BotAnswersListItem.objects.create(topic = t, title='title', question = q, answer = a)

        res = self.client.get('/api/top_questions/')
        # print(res.data)
        self.assertEqual(res.status_code, 401)  # not authenticated


        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        res = self.client.get('/api/top_questions/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)  # authenticated
        self.assertEqual(len(res.data['results']), 1)

class PaginationTestCase(APITestCase): # перевірка пагінації
    def test_pages(self): # перевірка на правильне оформлення сторінки
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        for i in range(29):
            BotMessage.objects.create(is_user=True, user=user, message='message {}'.format(i), rating=0)

        res = self.client.get('/api/messages/')
        # print(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data['results']), 10)
        self.assertEqual(res.data['count'], 29)
        self.assertIsNot(res.data['next'], 'null')
    def test_custom_page_size(self): # перевірка на можливість вказати власний розмір сторінки
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)
        self.client.force_authenticate(user, token)

        for i in range(29):
            BotMessage.objects.create(is_user=True, user=user, message='message {}'.format(i), rating=0)

        res = self.client.get('/api/messages/?page_size=15')
        # print(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data['results']), 15)
        self.assertEqual(res.data['count'], 29)
        self.assertIsNot(res.data['next'], 'null')
