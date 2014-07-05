#coding=utf-8

import tornado.web
from handlers.adminbase import AdminBaseHandler
from models.database import *
from tornado.escape import json_encode
from bson.objectid import ObjectId
# g_keyword = ""

def admin_search_music(keyword, begin_num, end_num):
    search_result_list = admin_search_music_form_db(keyword, begin_num, end_num)
    to_send_search_result = []
    for music in search_result_list:
        one_music = {
            'music_id': str(music['_id']),
            'music_url': music.get("music_url").split('/')[-1],
            'music_name': music.get("music_name"),
            'music_artist': music.get("music_artist"),
            'music_picture_url': music.get("music_picture_url").split('/')[-1],
            'music_mood': music.get('music_mood'),
            'music_zone': music.get('music_zone'),
            'music_publish_date': music.get('music_publish_date'),
            'music_style': music.get('music_style'),
        }
        to_send_search_result.append(one_music)
    return to_send_search_result



class AdminSearchMusicHandler(AdminBaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('musicsearch.html')
        # pass
        global g_keyword
        g_keyword = self.get_argument("keyword", "default")
        # print(keyword)


    @tornado.web.authenticated
    def post(self):
        global g_keyword
        if not g_keyword:
            g_keyword = "default"
        action = self.get_argument("action", "default")
        begin_num = int(self.get_argument("begin_num", "-1"))
        end_num = int(self.get_argument("end_num", "-1"))

        if action == "refresh":
            to_send_search_result = admin_search_music(g_keyword, begin_num, end_num)
            self.write( json_encode(to_send_search_result) )

        if action == "search":
            g_keyword = self.get_argument("keyword", "default_keyword")
            to_send_search_result = admin_search_music(g_keyword, begin_num, end_num)
            self.write( json_encode(to_send_search_result) )

        if action == "page_change":
            to_send_search_result = admin_search_music(g_keyword, begin_num, end_num)
            self.write( json_encode(to_send_search_result) )

        if action == "delete":
            musicid = self.get_argument("musicid","-1")
            if musicid != -1:
                delete_music_from_db( ObjectId(musicid) )
            to_send_search_result = admin_search_music(g_keyword, begin_num, end_num)
            self.write( json_encode(to_send_search_result) )




