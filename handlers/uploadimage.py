#coding=utf-8

import tornado.web
from handlers.base import BaseHandler
from models.database import *

class UploadImageHandler(BaseHandler):
    def post(self):
        username = self.get_current_user()
        image_name = '/Users/yxj/github_repos/music_platform/static/images/gravatar/'+ username + '.jpg'
        path_list = image_name.split('/')
        gravatar = '/' + path_list[6] +'/' + path_list[7] +'/' + path_list[8]
        print gravatar
        if self.request.files:
            myfile = self.request.files['myfile'][0]
            fin = open(image_name,"wb")
            print "success to open file"
            fin.write(myfile["body"])
            fin.flush()
            fin.close()
            update_gravatar(username, gravatar)
            self.redirect(self.get_argument('next', '/myzone'))

