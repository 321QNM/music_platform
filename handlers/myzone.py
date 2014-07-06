#coding=utf-8

from handlers.base import BaseHandler

class MyZoneHandler(BaseHandler):
    def get(self):
        if not self.get_current_user():
            self.redirect('/index')
            return
        self.render('myzone.html')

    def post(self):
        pass
