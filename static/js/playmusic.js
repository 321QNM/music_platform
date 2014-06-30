$(document).ready(function(){
    var my_msg;

    function ajax_post_test(){
       $.ajax({
           type:"POST",
           url:"/",
           success:function(msg){
               my_obj = JSON.parse(msg);
               loadmusic(my_obj.music_url,my_obj.music_name,my_obj.music_artist,my_obj.music_picture_url);
           }
       })
    }
    ajax_post_test();

    var autoplay = true;
    function loadmusic(music_url,music_name,music_artist,music_picture_url){
        var newaudio = $('<audio>').html('<source src="'+music_url+'">').appendTo('#player');
        $('.tag').html('<strong>'+music_name+'</strong><span class="artist">'+music_artist+'</span>');
        audio = newaudio[0];
        audio.addEventListener('canplay', afterLoad, false);
    };
    function afterLoad(){
        if (autoplay == true) play();
    };
    function play(){
        audio.play();
    };
});
