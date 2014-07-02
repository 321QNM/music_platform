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
        email = self.get_argument("email", "default")
        username = self.get_argument("username", "default")
        password = self.get_argument("password", "default")
        invite_code = self.get_argument("invitecode", "default")

        if username != "default" and email == "default" and password == "default" and invite_code == "default":
            if is_username_existed(username):
                self.write("existed")
        if invite_code != "default" and email == "default" and password == "default" and username == "default":
            if not is_valid_invite_code(invite_code):
                self.write("is_not_valid_invite_code")
        # self.write(email+username+password+invite_code)
        if username != "default" and email != "default" and password != "default" and invite_code != "default":
            if not is_username_existed(username) and is_valid_invite_code(invite_code):
                # self.write(email+username+password+invite_code)
                insert_new_user(username, password)
                if invite_code != "welcome7":
                    invite_code_be_used(invite_code)
                self.set_secure_cookie('username', username)
                self.redirect(self.get_argument('next', '/'))
