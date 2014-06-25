#coding=utf-8

from urls import urls
from config import SETTINGS

import tornado.web


class Application(tornado.web.Application):
    def __init__(self):
        handlers = urls
        settings = SETTINGS
        tornado.web.Application.__init__(self, handlers, **settings)
