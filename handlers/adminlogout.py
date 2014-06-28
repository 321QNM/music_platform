#coding=utf-8

from handlers.adminbase import AdminBaseHandler

class AdminLogoutHandler(AdminBaseHandler):
    def get(self):
        if not self.get_current_user():
            self.redirect('/adminlogin')
            return
        self.clear_cookie("admin_username")
        self.redirect(self.get_argument("next", "/adminlogin"))
