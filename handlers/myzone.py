#coding=utf-8

from handlers.base import BaseHandler
from models.database import *
from tornado.escape import json_encode
from bson.objectid import ObjectId

def generate_habit_music_list(username_id, kind, begin_num, end_num):
    habit_music_list = search_habit_music_list(username_id, kind, begin_num, end_num)
    to_send_liked_music_list =[]
    for music in habit_music_list:
        music_with_detail = search_music_detail( ObjectId(music['music_id']) )
        one_music = {
            "music_id": str(music_with_detail.get('_id')),
            "music_name": music_with_detail.get('music_name'),
            "music_artist": music_with_detail.get('music_artist'),
        }
        to_send_liked_music_list.append(one_music)
    return to_send_liked_music_list

class MyZoneHandler(BaseHandler):
    def get(self):
        if not self.get_current_user():
            self.redirect('/index')
            return
        self.render('myzone.html')

    def post(self):
        username = self.get_current_user()
        username_id = get_username_id(username)
        action = self.get_argument("action", "default")
        kind = self.get_argument("kind", "default")
        begin_num = int(self.get_argument("begin_num", "-1"))
        end_num = int(self.get_argument("end_num", "-1"))


        if action == "refresh" and kind == "like":
            to_send_habit_music_list = generate_habit_music_list(username_id, kind, begin_num, end_num)
            self.write( json_encode(to_send_habit_music_list) )

        if action == "refresh" and kind == "hate":
            to_send_habit_music_list = generate_habit_music_list(username_id, kind, begin_num, end_num)
            self.write( json_encode(to_send_habit_music_list) )

        if action == "page_change" and kind == "like":
            to_send_habit_music_list = generate_habit_music_list(username_id, kind, begin_num, end_num)
            self.write( json_encode(to_send_habit_music_list) )

        if action == "page_change" and kind == "hate":
            to_send_habit_music_list = generate_habit_music_list(username_id, kind, begin_num, end_num)
            self.write( json_encode(to_send_habit_music_list) )

        if action == "refresh" and kind == "info":
            pass

        if action == "delete" and kind == "like":
            like_music_id = self.get_argument("like_musicid", "default")
            delete_music_form_habit_coll(kind, username_id, like_music_id)
            to_send_habit_music_list = generate_habit_music_list(username_id, kind, begin_num, end_num)
            self.write( json_encode(to_send_habit_music_list) )

        if action == "delete" and kind == "hate":
            hate_music_id = self.get_argument("hate_musicid", "default")
            delete_music_form_habit_coll(kind, username_id,hate_music_id)
            to_send_habit_music_list = generate_habit_music_list(username_id, kind, begin_num, end_num)
            self.write( json_encode(to_send_habit_music_list) )






