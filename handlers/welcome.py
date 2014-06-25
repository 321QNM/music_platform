#coding=utf-8

import tornado.web
from handlers.base import BaseHandler

class WelcomeHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('index.html', user=self.current_user)
