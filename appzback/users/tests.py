from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# тестування користувачів
class UserTestCase(APITestCase):
    def test_login(self): # тестування входу, чи буде мати користувач доступ до системи після входу
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user = user)

        self.client.force_authenticate(user, token)
        res = self.client.get('/api/accounts/profile/')
        #print(res.data)


        self.assertEqual(res.status_code, 200)

    def test_access(self): # перевірка безпеки, чи буде мати користувач доступ до системи без входу
        res = self.client.get('/api/accounts/profile/')
        #print(res)
        self.assertEqual(res.status_code, 401) # not authenticated

    def test_get_token(self): # перевірка отримання токену для користувача
        user = get_user_model().objects.create_user(username='denys', password='denys')
        token = Token.objects.create(user=user)

        res = self.client.get('/api/accounts/profile/')
        self.assertEqual(res.status_code, 401) # not authenticated

        data = {'username':'denys', 'password':'denys'}
        restok = self.client.post('/api/get-token', data)
        self.assertEqual(restok.status_code, 200) # get token

        self.client.force_authenticate(user, token)

        reswithtok = self.client.get('/api/accounts/profile/')
        self.assertEqual(reswithtok.status_code, 200) # authenticated by token
        self.assertEqual(Token.objects.get(user=user), token) # перевірка чи дійсно токен належить користувачу


