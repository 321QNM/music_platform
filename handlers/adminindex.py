#coding=utf-8

import tornado.web
from handlers.adminbase import AdminBaseHandler

class AdminIndexHandler(AdminBaseHandler):
    @tornado.web.authenticated
    def get(self):
        if not self.get_current_user():
            self.redirect(self.get_argument('next', '/adminlogin'))
            return
        self.render('adminindex.html', admin_user=self.current_user)
