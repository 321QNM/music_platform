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
        action = self.get_argument("action", "default")
        email = self.get_argument("email", "default")
        username = self.get_argument("username", "default")
        password = self.get_argument("password1", "default")
        invite_code = self.get_argument("invitecode", "default")

        if action == "is_username_existed":
            if is_username_existed(username):
                self.write("existed")

        if action == "is_invitecode_existed":
            if not is_valid_invite_code(invite_code):
                self.write("is_not_valid_invite_code")

        if username != "default":
            if not is_username_existed(username) and is_valid_invite_code(invite_code):
                insert_new_user(username, password, email)
                if invite_code != "welcome7":
                    invite_code_be_used(invite_code)
                self.set_secure_cookie('username', username)
                self.redirect(self.get_argument('next', '/'))
