#coding=utf-8

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

def insert_new_user(username, password):
    collection = db.user
    result = collection.insert( {"username": username, "password": password} )
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
    return str(result['_id'])

def insert_music_to(action, username_id, music_id):
    collection = db[action]
    if username_id and music_id and not collection.find_one({"username_id": username_id, "music_id": music_id}):
        collection.insert({"username_id": username_id, "music_id": music_id})

def remove_music_from_like(username_id, music_id):
    collection = db.like
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
    insert_music_to("like", "fdasdfasfd", "43125421514f")

if __name__ == '__main__':
    main()
