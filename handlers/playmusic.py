#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
from tornado.escape import json_encode
import random
from models.database import *

def generate_new_music():
    music_list = personal_recommend()
    current_music = music_list[ random.randint(0, len(music_list)-1 )]
    current_music_url = current_music["music_url"]
    current_music_name = current_music["music_name"]
    current_music_artist = current_music["music_artist"]
    current_music_picture_url = current_music["music_picture_url"]
    send_music_json = {
        'music_url': current_music_url,
        'music_name': current_music_name,
        'music_artist': current_music_artist,
        'music_picture_url': current_music_picture_url,
    }
    return send_music_json

class PlayMusicHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
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
        action = self.get_argument("action", "default")

        if action == "refresh":
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))

        if action == "like":
            pass

        if action == "hate":
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))

        if action == "end":
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))

        if action == "next":
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))
