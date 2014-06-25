#coding=utf-8

from urls import urls

import tornado.web
import os.path

SETTINGS = dict(
    template_path = os.path.join(os.path.dirname(__file__), "templates"),
    static_path = os.path.join(os.path.dirname(__file__), "static"),
    login_url = '/login',
    cookie_secret = "jLL/zrkXQV6YXGxDN32xEiXZPVKop0JijF6uVR/trdU=",
    xsrf_cookie = True,
    debug = True,
)

class Application(tornado.web.Application):
    def __init__(self):
        handlers = urls
        settings = SETTINGS
        tornado.web.Application.__init__(self, handlers, **settings)
