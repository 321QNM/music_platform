#coding=utf-8

import tornado.web

class PageNotFoundHandler(tornado.web.RequestHandler):
    def write_error(self, status_code, **kwargs):
        # self.write("Gosh darnit, user! You caused a %d erroe." % status_code)
        self.render('404.html')
