#coding=utf-8
# unicode_literals 把所有的字符串转成unicode
from __future__ import unicode_literals
import os,re,sys

# 设置默认编码是utf-8，不然处理不了中文
reload(sys)
sys.setdefaultencoding('utf-8')
import id3reader

def main():
    path = "../static/music/"

    file_list = os.listdir(path)
    # print file_list

    music_info_list = []
    for music_name in file_list:
        id3r = id3reader.Reader(path + music_name)
        one_music_info = {
            # "music_name": id3r.getValue('title'),
            # "music_artist": id3r.getValue('performer'),
            # "music_album": id3r.getValue('album'),
            # "music_track": id3r.getValue('track'),
            # "music_publish_date": id3r.getValue('year'),
            # "music_fda": id3r.getValue('TIT2'),
            # "musid_genre": id3r.getValue('genre'),
            "music_comment": id3r.getValue('comment'),
        }
        music_info_list.append(one_music_info)

    print(music_info_list)

if __name__ == '__main__':
    main()
