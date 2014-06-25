#coding=utf-8
import os.path

SETTINGS = dict(
    template_path = os.path.join(os.path.dirname(__file__), "templates"),
    static_path = os.path.join(os.path.dirname(__file__), "static"),
    login_url = '/login',
    cookie_secret = "jLL/zrkXQV6YXGxDN32xEiXZPVKop0JijF6uVR/trdU=",
    xsrf_cookie = True,
    debug = True,
)
