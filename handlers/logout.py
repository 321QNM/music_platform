#coding=utf-8

from handlers.base import BaseHandler

class LogoutHandler(BaseHandler):
    def get(self):
        if not self.get_current_user():
            self.redirect('/')
            return
        self.clear_cookie("username")
        self.redirect(self.get_argument("next", "/"))
