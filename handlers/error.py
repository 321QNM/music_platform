#coding=utf-8

import tornado.web

class ErrorHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('error.html')
