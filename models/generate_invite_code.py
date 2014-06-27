#coding=utf-8

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.musicPlatform
collection = db.invitecode

def insert_invite_code(code, status=1):
    result = collection.insert( {"code": code, "status": status})
    return result

def main():
    for i in range(1,101):
        code = "welcome" + str(i)
        insert_invite_code(code)

if __name__ == "__main__":
    main()

