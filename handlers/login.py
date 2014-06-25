#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
from models.database import *

class LoginHandler(BaseHandler):
    def get(self):
        if self.get_current_user():
            self.redirect(self.get_argument('next', '/'))
            return
        self.render('login.html')

    def post(self):
        username = self.get_argument("username")
        password = self.get_argument("password")
        result = is_login_successful(username, password)
        if result:
            self.set_secure_cookie("username", username)
            self.redirect(self.get_argument('next', '/'))
        else:
            self.redirect('/login')
