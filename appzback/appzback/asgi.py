"""
ASGI config for appzback project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from channels.routing import URLRouter, ProtocolTypeRouter
from channels.security.websocket import AllowedHostsOriginValidator  # new
from django.core.asgi import get_asgi_application
from appzback.routing import websocket_urlpatterns  # new

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter , URLRouter


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'appzback.settings')

application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http" : get_asgi_application(), 
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns)))
    }
)
