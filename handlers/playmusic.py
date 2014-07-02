#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
from tornado.escape import json_encode
# from bson.json_util import dumps
import random
from models.database import *

music_id = ''

def generate_new_music():
    music_list = personal_recommend()
    current_music = music_list[ random.randint(0, len(music_list)-1 )]

    current_music_id = current_music["_id"]
    current_music_url = current_music["music_url"]
    current_music_name = current_music["music_name"]
    current_music_artist = current_music["music_artist"]
    current_music_picture_url = current_music["music_picture_url"]
    if not current_music_picture_url:
        current_music_picture_url = '../static/images/music_pictures/default.jpg'

    send_music_json = {
        'music_id': str(current_music_id),
        'music_url': current_music_url,
        'music_name': current_music_name,
        'music_artist': current_music_artist,
        'music_picture_url': current_music_picture_url,
    }
    global music_id
    music_id = send_music_json['music_id']
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
        # global music_id

        username = self.get_current_user()
        username_id = get_username_id(username)
        action = self.get_argument("action", "default")

        if action == "refresh":
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))

        if action == "like":
            insert_music_to(action, username_id, music_id)
            # pass

        if action == "cancel_like":
            remove_music_from_like(username_id, music_id)

        if action == "hate":
            insert_music_to(action, username_id, music_id)
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))


        if action == "end":
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))

        if action == "next":
            insert_music_to(action, username_id, music_id)
            send_music_json = generate_new_music()
            self.write(json_encode(send_music_json))
