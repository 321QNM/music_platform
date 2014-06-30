#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
import random
from database import *

class PlayMusicHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):

        music_source_list = personal_recommend()
        music_source = music_source_list[ random.randomint(0,len(music_source_list))]
        # items = ["Item 1", "Item 2", "Item 3"]
        # music_source="../static/music/1.mp3"
        params = {
            "user" : self.current_user,
            "music_source" : music_source,
            # "items": items,
        }
        self.render(u"playmusic.html", **params)
        # self.render('playmusic.html', user=self.current_user, music_source="../static/music/1.mp3")

