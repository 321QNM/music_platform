#coding=utf-8
import re
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.musicPlatform

def is_username_existed(username):
    collection = db.user
    result = collection.find_one( {"username": username} )
    if result:
        return True
    else:
        return False

def is_login_successful(username, password):
    collection = db.user
    #分步检查,用户名不对,密码不对
    result = collection.find_one( {"username": username, "password": password} )
    if result:
        return True
    else:
        return False

def insert_new_user(username, password, email):
    collection = db.user
    result = collection.insert( {"username": username, "password": password, "email": email, "gravatar": "../static/images/gravatar/default.jpg","bio":"To lazy to write anything."} )
    return result

def is_valid_invite_code(invite_code):
    collection = db.invitecode
    result = collection.find_one( {"code": invite_code, "status": 1} )
    if result:
        return True
    else:
        return False

def invite_code_be_used(invite_code):
    collection = db.invitecode
    collection.update( {"code": invite_code}, {"$inc": {"status": -1}} )

def is_admin_username_existed(admin_username):
    collection = db.music_admin
    result = collection.find_one( {"admin_username": admin_username} )
    if result:
        return True
    else:
        return False

def insert_music_to_database(music):
    collection = db.music
    if not collection.find_one( {"music_name": music['music_name']} ):
        collection.insert(music)

def update_music_in_database(admin_edit_music):
    collection = db.music
    collection.update(
        {"_id": admin_edit_music.get('music_id')},
        {"$set":
            {"music_name": admin_edit_music.get('music_name'),
            "music_artist": admin_edit_music.get('music_artist'),
            "music_zone": admin_edit_music.get('music_zone'),
            "music_style": admin_edit_music.get('music_style'),
            "music_mood": admin_edit_music.get('music_mood'),
            "music_url": admin_edit_music.get('music_url'),
            "music_picture_url": admin_edit_music.get('music_picture_url'),
            "music_publish_date": admin_edit_music.get('music_publish_date')},
        }
        # true
        # true
    )

def is_admin_login_successful(admin_username, admin_password):
    collection = db.music_admin
    result = collection.find_one( {"admin_username": admin_username, "admin_password": admin_password} )
    if result:
        return True
    else:
        return False

def get_username_id(username):
    collection = db.user
    result = collection.find_one({"username": username})
    return str(result.get('_id'))

def insert_music_to(action, username_id, music_id):
    collection = db[action]
    if username_id and music_id and not collection.find_one({"username_id": username_id, "music_id": music_id}):
        collection.insert({"username_id": username_id, "music_id": music_id})

def remove_music_from_like(username_id, music_id):
    collection = db.like
    if collection.find_one({"username_id": username_id, "music_id": music_id}):
        collection.remove({"username_id": username_id, "music_id": music_id})

def db_is_music_liked(username_id, music_id):
    collection = db.like
    result = collection.find_one({"username_id": username_id, "music_id": music_id})
    if result:
        return "yes"
    else:
        return "no"

def personal_recommend():
    collection = db.music
    data = list(collection.find())
    return data

def admin_get_musics_from_db(begein_num, end_num):
    collection = db.music
    data = list(collection.find().limit(end_num-begein_num).skip(begein_num))
    return data

def delete_music_from_db(music_id):
    collection = db.music
    collection.remove({"_id": music_id})

def is_music_name_existed(music_name):
    collection = db.music
    result = collection.find_one({"music_name": music_name})
    if result:
        return "yes"
    else:
        return "no"

def admin_search_music_form_db(keyword, begin_num, end_num):
    collection = db.music
    keyword_reg = re.compile(keyword, re.IGNORECASE)
    search_result = list(collection.find(
        {"$or": [
            {"music_name": keyword_reg},
            {"music_artist": keyword_reg},
            {"music_mood": keyword_reg},
            {"music_zone": keyword_reg},
            {"music_style": keyword_reg},
            ]
        }
    ).limit(end_num-begin_num).skip(begin_num))
    return search_result

def search_habit_music_list(username_id, kind, begin_num, end_num):
    collection = db[kind]
    habit_music_list = list(collection.find({"username_id": username_id}).limit(end_num-begin_num).skip(begin_num))
    return habit_music_list

def search_music_detail(music_id):
    collection = db.music
    return collection.find_one({"_id":music_id}, {"music_name": 1, "music_artist": 1})

def delete_music_form_habit_coll(kind, username_id, like_music_id):
    collection = db[kind]
    collection.remove({"username_id":username_id,"music_id": like_music_id})

def get_user_detail(username_id):
    collection = db.user
    return collection.find_one({"_id":username_id}, {"username": 1, "bio":1, "gravatar":1,"_id": 0})


def main():
    #如果单独执行此文件,会复原邀请码collection
    # collection = db.invitecode
    # for i in range(1, 101):
    #     invite_code = "welcome" + str(i)
    #     collection.update( {"code": invite_code}, {"$set": {"status": 1}}, upsert=True)
    # print('ok')
    # collection = db.music
    # data = list(collection.find())
    # print(data)
    # print data[0]['music_name']
    # pass
    # print get_user_id('yxjxx')
    # insert_music_to("like", "fdasdfasfd", "43125421514f")
    search_liked_music_list("53aaf3e35cd71d25b89d7b27", "like", 0,10)

if __name__ == '__main__':
    main()
