#coding=utf-8

from handlers.welcome import WelcomeHandler
from handlers.signup import SignupHandler
from handlers.login import LoginHandler
from handlers.logout import LogoutHandler
from handlers.test import TestHandler
from handlers.playmusic import PlayMusicHandler
from handlers.error import ErrorHandler
from handlers.pagenotfound import PageNotFoundHandler
from handlers.adminlogin import AdminLoginHandler
from handlers.adminindex import AdminIndexHandler
from handlers.adminlogout import AdminLogoutHandler
from handlers.musicsearch import AdminSearchMusicHandler

urls = [
    (r'/index', WelcomeHandler),
    (r'/signup', SignupHandler),
    (r'/login', LoginHandler),
    (r'/logout', LogoutHandler),
    (r'/test', TestHandler),
    (r'/error', ErrorHandler),
    (r'/', PlayMusicHandler),
    (r'/adminlogin', AdminLoginHandler),
    (r'/adminindex', AdminIndexHandler),
    (r'/adminlogout', AdminLogoutHandler),
    (r'/musicsearch', AdminSearchMusicHandler),
    (r'.*',PageNotFoundHandler),
]
