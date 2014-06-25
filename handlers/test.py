#coding=utf-8

from handlers.base import BaseHandler
import tornado.web

class TestHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.write("testing! there is cookie")
