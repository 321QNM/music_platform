#coding=utf-8

from handlers.welcome import WelcomeHandler
from handlers.signup import SignupHandler
from handlers.login import LoginHandler
from handlers.logout import LogoutHandler
from handlers.test import TestHandler
from handlers.playmusic import PlayMusicHandler
from handlers.error import ErrorHandler
from handlers.pagenotfound import PageNotFoundHandler

urls = [
    (r'/index', WelcomeHandler),
    (r'/signup', SignupHandler),
    (r'/login', LoginHandler),
    (r'/logout', LogoutHandler),
    (r'/test', TestHandler),
    (r'/error', ErrorHandler),
    (r'/', PlayMusicHandler),
    (r'.*',PageNotFoundHandler),
]
