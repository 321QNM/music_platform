f = open('music_300_info.py','a')

f.write("#codeing=utf-8\n")
f.write("music_list = [\n")
for i in range(1,101):
    f.write("    dict(\n")
    f.write("        music_name = '',\n")
    f.write("        music_publish_date = '',\n")
    f.write("        music_url = path +'',\n")
    f.write("        music_artist = '',\n")
    f.write("        music_zone = '',\n")
    f.write("        music_style = '',\n")
    f.write("        music_mood = ''\n")
    f.write("        music_picture_url = ''\n")
    f.write("    ),\n")
f.write("]")


    # dict(
    #     music_name = 'a',
    #     music_publish_date = '2014/5/2',
    #     music_url = path +'We are the world',
    #     music_artist = 'Mike',
    #     music_zone = 'taiwan',
    #     music_style = 'pop',
    #     music_mood = 'happy'
    # ),


# #codeing=utf-8
# from database import *
# path = '/home/yxj'
# music_list = [
#     dict(
#         music_name = '',
#         music_publish_date = '',
#         music_url = path +'',
#         music_artist = '',
#         music_zone = '',
#         music_style = '',
#         music_mood = ''
#     ),
#     dict(
#         music_name = '',
#         music_publish_date = '',
#         music_url = path +'',
#         music_artist = '',
#         music_zone = '',
#         music_style = '',
#         music_mood = ''
#     ),
# ]

# for music in music_list:
#     insert_music_to_database(music)
#     # print(music)

