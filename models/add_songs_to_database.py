#coding=utf-8
import os, sys
from database import insert_song_to_database

def main():
    path = "/Users/yxj/Dropbox/music_Platform/static/music/"

    file_list = os.listdir(path)
    print file_list

    for music_name in file_list:
        insert_song_to_database(music_name)


if __name__ == '__main__':
    main()

