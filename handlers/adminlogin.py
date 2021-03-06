#coding=utf-8

import tornado.web
from handlers.adminbase import AdminBaseHandler
from models.database import *

class AdminLoginHandler(AdminBaseHandler):
    def get(self):
        if self.get_current_user():
            self.redirect(self.get_argument('next', '/adminindex'))
            return
        self.render('adminlogin.html')

    def post(self):
        admin_username = self.get_argument("username", "default")
        admin_password = self.get_argument("password", "default")

        if admin_username != "default" and admin_password == "default":
            if not is_admin_username_existed(admin_username):
                self.write("admin_not_existed")

        if admin_password != "default" and admin_username != "default":
            result = is_admin_login_successful(admin_username, admin_password)
            if result:
                self.set_secure_cookie("admin_username", admin_username)
                self.redirect(self.get_argument('next', '/adminindex'))
            else:
                self.render('error.html', error_msg="/adminlogin")
