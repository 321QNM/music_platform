#coding=utf-8

import tornado.web
from handlers.base import BaseHandler

class PlayMusicHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('playmusic.html', user=self.current_user)

