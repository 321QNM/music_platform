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
    collection.update( {"code": invite_code}, {"$set": {"status": 0}}, upsert=False )

def insert_song_to_database(music_name,artist="default"):
    collection = db.music
    if not collection.find_one( {"music_name": music_name} ):
        collection.insert( {"music_name": music_name, "artist": artist})
    # collection.update( {"music_name": music_name}, {"$set": {"artist": artist}}, upsert=True)

def is_admin_username_existed(admin_username):
    collection = db.music_admin
    result = collection.find_one( {"admin_username": admin_username} )
    if result:
        return True
    else:
        return False

def insert_music_to_database(music):
    collection = db.music
    collection.insert(music)

def is_admin_login_successful(admin_username, admin_password):
    collection = db.music_admin
    result = collection.find_one( {"admin_username": admin_username, "admin_password": admin_password} )
    if result:
        return True
    else:
        return False

def personal_recommend():
    collection = db.music
    data = list(collection.find())
    return data


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
    pass

if __name__ == '__main__':
    main()
