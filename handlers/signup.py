#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
from models.database import *

class SignupHandler(BaseHandler):
    def get(self):
        if self.get_current_user():
            self.redirect(self.get_argument('next', '/'))
            return
        self.render('signup.html')

    def post(self):
        username = self.get_argument("username")
        password = self.get_argument("password1")

        result = is_username_existed(username)

        if result:
            self.redirect('/signup')
        else:
            insert_new_user(username, password)
            self.set_secure_cookie('username', username)
            self.redirect(self.get_argument('next', '/'))
