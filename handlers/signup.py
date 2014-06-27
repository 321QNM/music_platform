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
        email = self.get_argument("email")
        username = self.get_argument("username")
        password = self.get_argument("password1")
        invite_code = self.get_argument("invitecode")

        if is_username_existed(username):
            self.write("existed")
        if is_valid_invite_code(invite_code):
            self.write("is_valid_invite_code")
        if not is_username_existed(username) and is_valid_invite_code(invite_code):
            insert_new_user(username, password)
            self.set_secure_cookie('username', username)
            self.redirect(self.get_argument('next', '/'))
