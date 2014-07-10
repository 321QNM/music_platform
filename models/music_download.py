#coding: utf-8
import urllib
import urllib2
import json
import cookielib
from urlparse import urlsplit


class FmGetter(object):
    def __init__(self):
        self._url = "http://www.douban.com/j/app/radio/people?app_name=radio_desktop_win&version=100&channel=1&sid=undefined&type=n"
        cookie = cookielib.CookieJar()
        self._opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))

    def get(self):
        response = self._opener.open(self._url)
        data = response.read()
        songs = json.loads(data)
        return songs["song"]


    def download_music(self, music_url):
        suffix_list = ['flac','mp3']
        filename = urlsplit(music_url)[2].split('/')[-1]
        file_suffix = filename.split('.')[1]
        if file_suffix in suffix_list :
            urllib.urlretrieve(music_url,filename)

if __name__ == "__main__":
    fm = FmGetter()
    song_list = fm.get()
    for music in song_list:
        print music['url']
        fm.download_music(music['url'])
    print "done"
