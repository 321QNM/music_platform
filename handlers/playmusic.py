#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
from tornado.escape import json_encode
import random
from models.database import *

class PlayMusicHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        # music_url_list = personal_recommend()
        # music_url = music_url_list[ random.randint(0, len(music_url_list)-1 )]["music_url"]
        # # items = ["Item 1", "Item 2", "Item 3"]
        # params = {
        #     "user" : self.current_user,
        #     "music_url" : music_url,
        #     # "items": items,
        # }
        # self.render(u"playmusic.html", **params)
        # # self.render('playmusic.html', user=self.current_user, music_url="../static/music/1.mp3")
        self.render('playmusic.html')

    @tornado.web.authenticated
    def post(self):
        obj = {
            'music_url': "../static/music/1.mp3",
        }
        self.write(json_encode(obj))
