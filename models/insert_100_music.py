#-*- coding: UTF-8 -*-
# unicode_literals 把所有的字符串转成unicode
from __future__ import unicode_literals
import os,re,sys

# 设置默认编码是utf-8，不然处理不了中文
reload(sys)
sys.setdefaultencoding('utf-8')

from database import *
path = '../static/music/'
image_path = '../static/images/music_pictures/'
music_list = [
    dict(
        music_name = '光辉岁月',
        music_publish_date = '2013/05/09',
        music_url = path +'光辉岁月.mp3',
        music_artist = 'beyond',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Happy',
        music_picture_url = image_path + 'beyond.jpg'
    ),
    dict(
        music_name = '千千阙歌',
        music_publish_date = '2013/05/09',
        music_url = path +'千千阙歌.mp3',
        music_artist = '梅艳芳',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Happy',
        music_picture_url = image_path + '梅艳芳.jpg'
    ),
    dict(
        music_name = 'Stay Beautiful',
        music_publish_date = '2014/05/03',
        music_url = path +'Stay Beautiful.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'USA',
        music_style = 'folk',
        music_mood = 'Happy',
        music_picture_url = image_path + 'Taylor Swift.jpg',
    ),
    dict(
        music_name = '浮夸',
        music_publish_date = '2013/06/10',
        music_url = path +'浮夸.mp3',
        music_artist = '陈奕迅',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Happy',
        music_picture_url = image_path + '5.jpg',
    ),
    dict(
        music_name = 'K歌之王',
        music_publish_date = '2013/08/15',
        music_url = path +'K歌之王.mp3',
        music_artist = '陈奕迅',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Happy',
        music_picture_url = image_path + '6.jpg',
    ),
    dict(
        music_name = '十年',
        music_publish_date = '2013/04/20',
        music_url = path +'十年.mp3',
        music_artist = '陈奕迅',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Sad',
        music_picture_url = image_path + '7.jpg',
    ),
    dict(
        music_name = '红豆',
        music_publish_date = '2012/01/12',
        music_url = path +'红豆.mp3',
        music_artist = '王菲',
        music_zone = 'HKTW',
        music_style = 'Classical',
        music_mood = 'Sad',
        music_picture_url = image_path + '8.jpg',
    ),
    dict(
        music_name = '传奇',
        music_publish_date = '2010/09/15',
        music_url = path +'传奇.mp3',
        music_artist = '王菲',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Sad',
        music_picture_url = image_path + '9.jpg',
    ),
    dict(
        music_name = '我愿意',
        music_publish_date = '2013/07/20',
        music_url = path +'我愿意.mp3',
        music_artist = '王菲',
        music_zone = 'HKTW',
        music_style = 'Classical',
        music_mood = 'Happy',
        music_picture_url = image_path + '10.jpg',
    ),
    dict(
        music_name = '因为爱情',
        music_publish_date = '2014/03/24',
        music_url = path +'因为爱情.mp3',
        music_artist = '王菲',
        music_zone = 'HKTW',
        music_style = 'POP',
        music_mood = 'Happy',
        music_picture_url = image_path + '11.jpg',
    ),
    dict(
        music_name = '但愿人长久',
        music_publish_date = '2010/08/19',
        music_url = path +'但愿人长久.mp3',
        music_artist = '王菲',
        music_zone = 'HKTW',
        music_style = 'Classical',
        music_mood = 'Sad',
        music_picture_url = image_path + '12.jpg',
    ),
    dict(
        music_name = '青花瓷',
        music_publish_date = '2014/03/10',
        music_url = path +'青花瓷.mp3',
        music_artist = '周杰伦',
        music_zone = 'China',
        music_style = 'POP',
        music_mood = 'Sad',
        music_picture_url = image_path + '13.jpg',
    ),
    dict(
        music_name = '发如雪',
        music_publish_date = '2012/09/10',
        music_url = path +'发如雪.mp3',
        music_artist = '周杰伦',
        music_zone = 'China',
        music_style = 'POP',
        music_mood = 'Sad'
    ),
    dict(
        music_name = '一路向北',
        music_publish_date = '2013/01/16',
        music_url = path +'一路向北.mp3',
        music_artist = '周杰伦',
        music_zone = 'China',
        music_style = 'POP',
        music_mood = 'Sad'
    ),
    dict(
        music_name = '回到过去',
        music_publish_date = '2013/04/10',
        music_url = path +'回到过去.mp3',
        music_artist = '周杰伦',
        music_zone = 'China',
        music_style = 'POP',
        music_mood = 'Sad'
    ),
    dict(
        music_name = '东风破',
        music_publish_date = '2012/09/20',
        music_url = path +'东风破.mp3',
        music_artist = '周杰伦',
        music_zone = 'China',
        music_style = 'POP',
        music_mood = 'Sad'
    ),
    dict(
        music_name = '大海',
        music_publish_date = '1992/12/10',
        music_url = path +'大海.mp3',
        music_artist = '张雨生',
        music_zone = 'China',
        music_style = 'Classical',
        music_mood = 'Sad'
    ),
    dict(
        music_name = '我的未来不是梦',
        music_publish_date = '1990/08/10',
        music_url = path +'我的未来不是梦.mp3',
        music_artist = '张雨生',
        music_zone = 'China',
        music_style = 'Classical',
        music_mood = 'Happy'
    ),
    dict(
        music_name = '我期待',
        music_publish_date = '1991/11/20',
        music_url = path +'我期待.mp3',
        music_artist = '张雨生',
        music_zone = 'China',
        music_style = 'Classical',
        music_mood = 'Happy'
    ),
    dict(
        music_name = '口是心非',
        music_publish_date = '1993/04/10',
        music_url = path +'口是心非.mp3',
        music_artist = '张雨生',
        music_zone = 'China',
        music_style = 'Classical',
        music_mood = 'Sad'
    ),
    dict(
        music_name = '我是一颗秋天的树',
        music_publish_date = '1994/07/21',
        music_url = path +'我是一颗秋天的树.mp3',
        music_artist = '张雨生',
        music_zone = 'China',
        music_style = 'Classical',
        music_mood = 'Sad'
    ),
    dict(
        music_name = ' I Knew You Were Trouble',
        music_publish_date = '2013/11/22',
        music_url = path +'I Knew You Were Trouble.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'You Belong With Me',
        music_publish_date = '2014/01/21',
        music_url = path +'You Belong With Me.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'We Are Never Ever Getting Back Together',
        music_publish_date = '2011/10/11',
        music_url = path +'We Are Never Ever Getting Back Together.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'Last Christmas',
        music_publish_date = '2011/09/16',
        music_url = path +'Last Christmas.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'Red',
        music_publish_date = '2013/06/15',
        music_url = path +'Red.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'Love Story',
        music_publish_date = '2013/04/20',
        music_url = path +'Love Story.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'Cold As You',
        music_publish_date = '2014/05/10',
        music_url = path +'Cold As You.mp3',
        music_artist = 'Taylor Swift',
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
    dict(
        music_name = 'Sparks Fly',
        music_publish_dat   e = '2012/09/20',
        music_url = path    +'Sparks Fly.mp3',
        music_artist = ''   ,
        music_zone = 'EU',
        music_style = 'folk',
        music_mood = 'Happy'
    ),
]

for music in music_list:
    if not music.get('music_picture_url'):
        music['music_picture_url'] = image_path + 'default.jpg'
    insert_music_to_database(music)
    # print(music)
print("OK")
