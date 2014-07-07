#coding=utf-8
from database import *

def personal_recommend(username_id):
    all_music_list = get_all_music_list()
    hate_music_list = get_hate_music_list(username_id)
    personal_music_list = [x for x in all_music_list if x not in hate_music_list]
    return personal_music_list


