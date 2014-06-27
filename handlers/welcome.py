#coding=utf-8

import tornado.web
from handlers.base import BaseHandler

class WelcomeHandler(BaseHandler):
    #@tornado.web.authenticated
    def get(self):
        if self.get_current_user():
            self.redirect(self.get_argument('next', '/'))
            return
        self.render('index.html', user=self.current_user)
