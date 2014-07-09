#coding=utf-8
import os.path

SETTINGS = dict(
    template_path = os.path.join(os.path.dirname(__file__), "templates"),
    static_path = os.path.join(os.path.dirname(__file__), "static"),
    login_url = '/index',
    cookie_secret = "jLL/zrkXQV6YXGxDN32xEiXZPVKop0JijF6uVR/trdU=",
    xsrf_cookie = True,
    debug = True,
)

CONSTANT = dict(
    init_score = 100,
    like_increase_score = 2,
    hate_decrease_score = 2,
    next_decrease_score = 1,
)

if __name__ == '__main__':
    print CONSTANT['init_score']
