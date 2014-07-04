#coding=utf-8
# unicode_literals 把所有的字符串转成unicode
from __future__ import unicode_literals
import os,re,sys

# 设置默认编码是utf-8，不然处理不了中文
reload(sys)
sys.setdefaultencoding('utf-8')
import id3reader
from database import *

def main():
    path = "/Users/yxj/baiduyun/百度云同步盘/music_backup/music/"
    music_path = "../static/music/"
    image_path = '../static/images/music_pictures/'

    file_list = os.listdir(path)
    # print file_list

    music_info_list = []
    for music_name in file_list:
        # music_info_list = []
        id3r = id3reader.Reader(path + music_name)
        position = music_name.find('-')
        one_music_info = {
            "music_name": id3r.getValue("title"),
            # "music_artist": id3r.getValue('performer'),
            "music_artist": music_name[:position],
            "music_publish_date": id3r.getValue('year'),
            "music_url": music_path + music_name,
            "musid_style": id3r.getValue('genre'),
            # "music_album": id3r.getValue('album'),
            # "music_track": id3r.getValue('track'),
            # "music_tit2": id3r.getValue('TIT2'),
            # "music_comment": id3r.getValue('comment'),
        }
        music_info_list.append(one_music_info)

    # print(music_info_list)
    for music in music_info_list:
        if not music.get('music_picture_url'):
            music['music_picture_url'] = image_path + 'default.jpg'
        if not music.get('music_mood'):
            music['mood'] = "default_mood"
        if not music.get('music_zone'):
            music['zone'] = "default_zone"
        insert_music_to_database(music)
    print("OK")


if __name__ == '__main__':
    main()
