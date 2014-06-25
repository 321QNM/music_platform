#coding=utf-8

from handlers.welcome import WelcomeHandler
from handlers.signup import SignupHandler
from handlers.login import LoginHandler
from handlers.logout import LogoutHandler
from handlers.test import TestHandler

urls = [
    (r'/', WelcomeHandler),
    (r'/signup', SignupHandler),
    (r'/login', LoginHandler),
    (r'/logout', LogoutHandler),
    (r'/test', TestHandler),
]
