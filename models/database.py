#coding=utf-8

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.musicPlatform
collection = db.user

def is_username_existed(username):
    result = collection.find_one( {"username": username} )
    if result:
        return True
    else:
        return False

def is_login_successful(username, password):
    #分步检查,用户名不对,密码不对
    result = collection.find_one( {"username": username, "password": password} )
    if result:
        return True
    else:
        return False

def insert_new_user(username, password):
    result = collection.insert( {"username": username, "password": password} )
    return result
