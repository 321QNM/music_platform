#coding=utf-8

import tornado.web
import random

class PageNotFoundHandler(tornado.web.RequestHandler):
    def write_error(self, status_code, **kwargs):
        html_file_list = ['404_1.html', '404_2.html']
        self.render(html_file_list[random.randint(0,1)])
