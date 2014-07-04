#coding=utf-8

import tornado.web
from handlers.adminbase import AdminBaseHandler
from models.database import *
from tornado.escape import json_encode
from bson.objectid import ObjectId

newest_to_send_music_info_list = []

def generate_musics_table(begin_num, end_num):
    music_list = admin_get_musics_from_db(begin_num, end_num)
    to_send_music_info_list = []
    global newest_to_send_music_info_list
    for music in music_list:
        current_music_id = str(music["_id"])
        current_music_url = music["music_url"]
        current_music_name = music["music_name"]
        current_music_artist = music["music_artist"]
        current_music_picture_url = music["music_picture_url"]
        one_music =  {
            'music_id': current_music_id,
            'music_url': current_music_url,
            'music_name': current_music_name,
            'music_artist': current_music_artist,
            'music_picture_url': current_music_picture_url,
        }
        to_send_music_info_list.append(one_music)
    newest_to_send_music_info_list = to_send_music_info_list
    return to_send_music_info_list



class AdminIndexHandler(AdminBaseHandler):
    @tornado.web.authenticated
    def get(self):
        if not self.get_current_user():
            self.redirect(self.get_argument('next', '/adminlogin'))
            return
        self.render('adminindex.html', admin_user=self.current_user)


    @tornado.web.authenticated
    def post(self):
        action = self.get_argument("action", "default")
        begin_num = int(self.get_argument("begin_num", "default"))
        end_num = int(self.get_argument("end_num", "default"))

        if action == "refresh":
            to_send_music_info_list = generate_musics_table(begin_num, end_num)
            # print to_send_music_info_list
            self.write( json_encode(to_send_music_info_list) )

        if action == "page_change":
            to_send_music_info_list = generate_musics_table(begin_num, end_num)
            self.write( json_encode(to_send_music_info_list) )

        if action == "delete":
            musicnum = int(self.get_argument("musicnum","-1"))
            if musicnum != -1:
                to_delete_music = newest_to_send_music_info_list[musicnum - 1]
                delete_music_from_db( ObjectId(to_delete_music['music_id']) )
            to_send_music_info_list = generate_musics_table(begin_num, end_num)
            self.write( json_encode(to_send_music_info_list) )

