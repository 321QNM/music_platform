#coding=utf-8
import tornado.web
import tornado.options
import tornado.httpserver
import tornado.ioloop
import os.path

import pymongo

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

conn = pymongo.Connection("localhost", 27017)
db = conn["mydb"]
coll = db.users

def is_username_existed(username):
    # global coll
    result = coll.find_one({ "username": username })
    if result:
        return True
    else:
        return False

def is_login_successful(username, password):
    # global coll
    #分步检查,用户名不对,密码不对
    result = coll.find_one({"username": username, "password": password})
    if result:
        return True
    else:
        return False


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/', WelcomeHandler),
            (r'/signup', SignupHandler),
            (r'/logout', LogoutHandler),
            (r'/test', TestHandler),
            (r'/login', LoginHandler),
        ]
        settings =dict(
            template_path = os.path.join(os.path.dirname(__file__), "templates"),
            static_path = os.path.join(os.path.dirname(__file__), "static"),
            login_url = '/signup',
            cookie_secret = "jLL/zrkXQV6YXGxDN32xEiXZPVKop0JijF6uVR/trdU=",
            xsrf_cookie = True,
            debug = True,
        )
        tornado.web.Application.__init__(self, handlers, **settings)




class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("username")

class SignupHandler(BaseHandler):
    def get(self):
        if self.get_current_user():
            self.redirect(self.get_argument('next', '/'))
            return
        self.render('signup.html')

    def post(self):
        username = self.get_argument("username")
        password = self.get_argument("password")

        result = is_username_existed(username)

        if result:
            self.redirect('/signup')
        else:
            coll.insert({"username": username,"password": password})
            self.set_cookie("mycookie", "myvalue")
            self.set_secure_cookie('username', username)
            self.redirect(self.get_argument('next','/'))

class LoginHandler(BaseHandler):
    def get(self):
        if self.get_current_user():
            self.redirect(self.get_argument('next', '/'))
            return
        self.render('login.html')

    def post(self):
        username = self.get_argument("username")
        password = self.get_argument("password")
        result = is_login_successful(username, password)
        if result:
            self.set_secure_cookie("username", username)
            self.redirect(self.get_argument('next', '/'))
        else:
            self.redirect('/login')


class WelcomeHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('index.html', user=self.current_user)

class LogoutHandler(BaseHandler):
    def get(self):
        if not self.get_current_user():
            self.redirect('/')
            return
        self.clear_cookie("username")
        self.redirect(self.get_argument("next", "/"))

class TestHandler(BaseHandler):
    # @tornado.web.authenticated
    def get(self):
        self.write("testing!")


def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer( Application() )
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
