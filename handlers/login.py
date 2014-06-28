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
        username = self.get_argument("username", "default")
        password = self.get_argument("password", "default")

        if username != "default" and password == "default":
            if not is_username_existed(username):
                self.write("not_existed")

        if password != "default" and username != "default":
            result = is_login_successful(username, password)
            if result:
                self.set_secure_cookie("username", username)
                self.redirect(self.get_argument('next', '/'))
            else:
                self.render('error.html', error_msg="/login")
