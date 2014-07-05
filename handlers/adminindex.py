#coding=utf-8

import tornado.web
from handlers.adminbase import AdminBaseHandler
from models.database import *
from tornado.escape import json_encode
from bson.objectid import ObjectId

path = '../static/music/'
image_path = '../static/images/music_pictures/'

def generate_musics_table(begin_num, end_num):
    music_list = admin_get_musics_from_db(begin_num, end_num)
    to_send_music_info_list = []
    for music in music_list:
        current_music_id = str(music["_id"])
        current_music_url = music.get("music_url").split('/')[-1]
        current_music_name = music.get("music_name")
        current_music_artist = music.get("music_artist")
        current_music_picture_url = music.get("music_picture_url").split('/')[-1]
        current_music_mood = music.get('music_mood')
        current_music_zone = music.get('music_zone')
        current_music_publish_date = music.get('music_publish_date')
        current_music_style = music.get('music_style')
        one_music =  {
            'music_id': current_music_id,
            'music_url': current_music_url,
            'music_name': current_music_name,
            'music_artist': current_music_artist,
            'music_picture_url': current_music_picture_url,
            'music_mood': current_music_mood,
            'music_zone': current_music_zone,
            'music_style': current_music_style,
            'music_publish_date': current_music_publish_date,
        }
        to_send_music_info_list.append(one_music)
    return to_send_music_info_list

def admin_search_music(keyword):
    search_result_list = admin_search_music_form_db(keyword)
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
        begin_num = int(self.get_argument("begin_num", "-1"))
        end_num = int(self.get_argument("end_num", "-1"))

        if action == "refresh":
            to_send_music_info_list = generate_musics_table(begin_num, end_num)
            # print to_send_music_info_list
            self.write( json_encode(to_send_music_info_list) )

        if action == "page_change":
            to_send_music_info_list = generate_musics_table(begin_num, end_num)
            self.write( json_encode(to_send_music_info_list) )

        if action == "delete":
            musicid = self.get_argument("musicid","-1")
            if musicid != -1:
                delete_music_from_db( ObjectId(musicid) )
            to_send_music_info_list = generate_musics_table(begin_num, end_num)
            self.write( json_encode(to_send_music_info_list) )

        if action == "add_music":
            music_name = self.get_argument("music_name", "default")
            music_artist = self.get_argument("music_artist", "default")
            music_style = self.get_argument("music_style", "default")
            music_zone = self.get_argument("music_zone", "default")
            music_mood = self.get_argument("music_mood", "default")
            music_url = self.get_argument("music_url", "default")
            music_picture_url = self.get_argument("music_picture_url", "default")
            music_publish_date = self.get_argument("music_publish_date", "default")
            admin_add_music =  {
                'music_url': path + music_url,
                'music_name': music_name,
                'music_artist': music_artist,
                'music_picture_url': image_path + music_picture_url,
                'music_mood': music_mood,
                'music_zone': music_zone,
                'music_style': music_style,
                'music_publish_date': music_publish_date,
            }
            insert_music_to_database(admin_add_music)

        if action == "check_music_name":
            music_name = self.get_argument("music_name", "default")
            result = is_music_name_existed(music_name)
            self.write(result)

        if action == "search":
            keyword = self.get_argument("keyword", "default_keyword")
            to_send_search_result = admin_search_music(keyword)
            self.write( json_encode(to_send_search_result) )
            # pass


