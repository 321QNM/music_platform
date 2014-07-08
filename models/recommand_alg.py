#coding=utf-8
from database import *
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('localhost', 27017)
db = client.musicPlatform

def simp_personal_recommend(username_id):
    all_music_list = get_all_music_list()
    hate_music_list = get_hate_music_list(username_id)
    personal_music_list = [x for x in all_music_list if x not in hate_music_list]
    return personal_music_list


def personal_recommend(username_id):
    username = get_user_detail(ObjectId(username_id)).get('username')

    #每次遍历三个表之前先把所有的数值设为100
    user_habit = db.mathmodel.find_one({"username":username})

    for (the_artist, score) in user_habit.get('music_artist').items():
        the_artist = "music_artist." + the_artist
        db.mathmodel.update({"username":username}, {"$set": {the_artist: 100}})

    for(the_style, score) in user_habit.get('music_style').items():
        the_style = "music_style." + the_style
        db.mathmodel.update({"username":username}, {"$set": {the_style: 100}})

    for(the_mood, score) in user_habit.get('music_mood').items():
        the_mood = "music_mood." + the_mood
        db.mathmodel.update({"username":username}, {"$set": {the_mood: 100}})

    for(the_zone, score) in user_habit.get('music_zone').items():
        the_zone = "music_zone." + the_zone
        db.mathmodel.update({"username":username}, {"$set": {the_zone: 100}})

    #遍历like表,为每一首歌中music_style, music_artist,music_zone,music_mood +2
    for music in get_like_music_list(username_id):
        music_artist = music.get('music_artist')
        the_artist = "music_artist." + music_artist
        music_mood = music.get('music_mood')
        the_mood  = "music_mood." + music_mood
        music_style = music.get('music_style')
        the_style = "music_style." + music_style
        music_zone = music.get('music_zone')
        the_zone = "music_zone." + music_zone

        user_habit = db.mathmodel.find_one({"username":username})
        if user_habit.get('music_artist').get(music_artist):
            db.mathmodel.update({"username":username}, {"$inc": {the_artist: 2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_artist: 102}})

        if user_habit.get('music_mood').get(music_mood):
            db.mathmodel.update({"username":username}, {"$inc": {the_mood: 2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_mood: 102}})

        if user_habit.get('music_style').get(music_style):
            db.mathmodel.update({"username":username}, {"$inc": {the_style: 2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_style: 102}})

        if user_habit.get('music_zone').get(music_zone):
            db.mathmodel.update({"username":username}, {"$inc": {the_zone: 2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_zone: 102}})

    #遍历next表
    for music in get_next_music_list(username_id):
        music_artist = music.get('music_artist')
        the_artist = "music_artist." + music_artist
        music_mood = music.get('music_mood')
        the_mood  = "music_mood." + music_mood
        music_style = music.get('music_style')
        the_style = "music_style." + music_style
        music_zone = music.get('music_zone')
        the_zone = "music_zone." + music_zone

        user_habit = db.mathmodel.find_one({"username":username})
        if user_habit.get('music_artist').get(music_artist):
            db.mathmodel.update({"username":username}, {"$inc": {the_artist: -1}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_artist: 99}})

        if user_habit.get('music_mood').get(music_mood):
            db.mathmodel.update({"username":username}, {"$inc": {the_mood: -1}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_mood: 99}})

        if user_habit.get('music_style').get(music_style):
            db.mathmodel.update({"username":username}, {"$inc": {the_style: -1}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_style: 99}})

        if user_habit.get('music_zone').get(music_zone):
            db.mathmodel.update({"username":username}, {"$inc": {the_zone: -1}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_zone: 99}})

    #遍历hate表
    for music in get_hate_music_list(username_id):
        music_artist = music.get('music_artist')
        the_artist = "music_artist." + music_artist
        music_mood = music.get('music_mood')
        the_mood  = "music_mood." + music_mood
        music_style = music.get('music_style')
        the_style = "music_style." + music_style
        music_zone = music.get('music_zone')
        the_zone = "music_zone." + music_zone

        user_habit = db.mathmodel.find_one({"username":username})
        if user_habit.get('music_artist').get(music_artist):
            db.mathmodel.update({"username":username}, {"$inc": {the_artist: -2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_artist: 98}})

        if user_habit.get('music_mood').get(music_mood):
            db.mathmodel.update({"username":username}, {"$inc": {the_mood: -2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_mood: 98}})

        if user_habit.get('music_style').get(music_style):
            db.mathmodel.update({"username":username}, {"$inc": {the_style: -2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_style: 98}})

        if user_habit.get('music_zone').get(music_zone):
            db.mathmodel.update({"username":username}, {"$inc": {the_zone: -2}})
        else:
            db.mathmodel.update({"username":username}, {"$set": {the_zone: 98}})

    #至此用户操作习惯统计结果的分析全部完成,下面需要根据分析结果生成style_list,mood_list,artist_list,zone_list
    artist_list = []
    style_list = []
    mood_list = []
    zone_list = []
    user_habit = db.mathmodel.find_one({"username":username})

    for (the_artist, score) in user_habit.get('music_artist').items():
        if score >= 80:
            artist_list.append(the_artist)

    for(the_style, score) in user_habit.get('music_style').items():
        if score >= 80:
            style_list.append(the_style)

    for(the_mood, score) in user_habit.get('music_mood').items():
        if score >= 80:
            mood_list.append(the_mood)

    for(the_zone, score) in user_habit.get('music_zone').items():
        if score >= 80:
            zone_list.append(the_zone)

    #至此生成了4个list,最终的歌曲满足被上面的4个list包含,同时不在讨厌列表


    all_music_list = get_all_music_list()
    hate_music_list = get_hate_music_list(username_id)
    music_list_without_hate = [x for x in all_music_list if x not in hate_music_list]

    personal_music_list = []
    for music in music_list_without_hate:
        if music.get('music_artist') in artist_list and music.get('music_style') in style_list and music.get('music_mood') in mood_list and music.get('music_zone') in zone_list:
            personal_music_list.append(music)

    return personal_music_list

if __name__ == '__main__':
    personal_recommend('53ba83545cd71d0b1aef233d')


