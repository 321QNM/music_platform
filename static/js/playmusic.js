$(document).ready(function(){
    // var music_id = "";

    function ajax_post(action){
       $.ajax({
           type:"POST",
           url:"/",
           data: "action="+ action,
           success:function(msg){
               my_obj = JSON.parse(msg);
               // alert(my_obj.is_music_liked);
               loadmusic(my_obj.music_url,my_obj.music_name,my_obj.music_artist,my_obj.music_picture_url,my_obj.is_music_liked);
           }
       })
    }
    ajax_post("refresh");
    var time = new Date();
    var trigger = false;
    // var continous = true;
    var autoplay = true;
    var audio, timeout, isPlaying;

    function loadmusic(music_url, music_name, music_artist, music_picture_url, is_music_liked){
        var newaudio = $('<audio>').html('<source src="'+music_url+'">').appendTo('#player');
        $('.tag').html('<strong>'+music_name+'</strong><span class="artist">'+music_artist+'</span>');
        // alert(music_picture_url);
        $('body').css('background-image', 'url('+ music_picture_url +')');
        if(is_music_liked == "yes"){
            $('.likeBt').addClass('enable');
        }else{
            $('.likeBt').removeClass('enable');
        }
        audio = newaudio[0];
        // 音量
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        // 进度条
        audio.addEventListener('progress', beforeLoad, false);
        // 加载歌曲
        audio.addEventListener('canplay', afterLoad, false);
        // 歌曲播放完时间监听
        audio.addEventListener('ended', ended, false);
    };
    function afterLoad(){
        if (autoplay == true) play();
    };
    function play(){
        audio.play();
        $('.playBt').addClass('playing');//音乐播放，则暂停按钮覆盖播放按钮
        timeout = setInterval(updateProgress, 500);//500毫秒调用一次updateProgress，跟新进度条
        isPlaying = true;//表示正在播放
    };
    function pause(){
        audio.pause();
        $('.playBt').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
    }
    function updateProgress(){
        setProgress(audio.currentTime);//获得歌曲的当前时间
    }
    function setProgress(value){
        // .duration输出当前音频长度
        var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
            ratio = value / audio.duration * 100;

        $('.timer').html(parseInt(value/60)+':'+currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }
    //在加载之前seekable.end(index) 获得可寻址范围的结束位置  确定进度条长度  在css中修改
    function beforeLoad(){
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
    }

    // 进度条 .slider 滑动条控件  作用：点击修改进度
    $('.progress .slider').slider({step: 0.1, slide: function(event, ui){
        $(this).addClass('enable');
        setProgress(audio.duration * ui.value / 100);
        clearInterval(timeout);
    }, stop: function(event, ui){
        audio.currentTime = audio.duration * ui.value / 100;
        $(this).removeClass('enable');
        timeout = setInterval(updateProgress, 500);
    }});

    function ended(){
        // alert("OK");
        pause();
        ajax_post("end");
    }

    function setVolume(value){
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }
    var volume = localStorage.volume || 0.5;
    // 音量条，拖动调节音量
    $('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
        setVolume(ui.value);
        $(this).addClass('enable');
        $('.mute').removeClass('enable');
    }, stop: function(){
        $(this).removeClass('enable');
    }}).children('.pace').css('width', volume * 100 + '%');



    // 点击音量图标
    $('.mute').click(function(){
        if ($(this).hasClass('enable')){
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio.volume).addClass('enable');
            setVolume(0);
        }
    });
    // 点击播放暂停
    $('.playBt').on('click', function(){
        //检查播放暂停按钮样式 playing 是暂停按钮，表示正在播放  .hasClass 检测是否具有该类
        if ($(this).hasClass('playing')){
            pause();
        } else {
            play();
        }
    });
    // 下一曲
    $('.nextBt').on('click', function(){
        pause();
        $('audio').remove();
        ajax_post("next");
        // if (isPlaying == true) play();
    });
    // 喜欢
    $('.likeBt').on('click', function(){
        if ($(this).hasClass('enable')){
            $(this).removeClass('enable');
            ajax_post("cancel_like");
        }
        else{
            ajax_post("like");
            $('#float').addClass('showlikeBt');
            $('#float').addClass('animationlikeBt');
            setTimeout(continueExecution, 2000);
        }
        // if (isPlaying == true) play();
    });
    function continueExecution(){
        $('.likeBt').addClass('enable');
        $('#float').removeClass('animationlikeBt');
        $('#float').removeClass('showlikeBt');
    }
    // 讨厌
    $('.hateBt').on('click', function(){
        pause();
        $('audio').remove();
        ajax_post("hate");
        // if (isPlaying == true) play();
    });
    // 键盘监听
    $(document).keydown(function(event){

        // M键  静音/取消静音
        if (event.which == 77) {
            if ($(this).hasClass('enable')){
                setVolume($(this).data('volume'));
                $(this).removeClass('enable');
            } else {
                $(this).data('volume', audio.volume).addClass('enable');
                setVolume(0);
            }
        };
        if (event.which == 70) {
            // F键  喜欢/取消喜欢
            if ($(this).hasClass('enable')){
                $(this).removeClass('enable');
                ajax_post("cancel_like");
            }
            else{
                ajax_post("like");
                $('#float').addClass('showlikeBt');
                $('#float').addClass('animationlikeBt');
                setTimeout(continueExecution, 2000);
            }
        };
        if (event.which == 32) {
            // 空格  暂停/播放
            if ($(this).hasClass('playing')){
                    pause();
                } else {
                    play();
                }
            };
        if (event.which == 78) {
            // N键  下一曲
            pause();
            $('audio').remove();
            ajax_post("next");
        };
        if (event.which == 68) {
            // D键  删除
            pause();
            $('audio').remove();
            ajax_post("hate");
        };
    });
});
