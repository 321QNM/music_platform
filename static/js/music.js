(function($){
    // Settings
    // var repeat = localStorage.repeat || 0,
        //随机播放
        // shuffle = localStorage.shuffle || 'false',
    var continous = true,
        autoplay = true,
        playlist = [
            {
            title: '肩上蝶',
            artist: '金志文',
            album: '肩上蝶',
            cover:'http://attach.hunantv.com/uploads/images/cms_img/201212/02/18/10504925422628832430.jpg',
            mp3: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/jianshangdie.mp3',
            ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/jianshangdie.ogg'
            },
            {
            title: '我可以抱你吗',
            artist: '张惠妹',
            album: '我可以抱你吗',
            cover: 'http://img.xiami.com/images/album/img50/2450/132731360220331_4.jpg',
            mp3: 'http://www.nullblogs.com/bowen/HTML5player/music/wokeyibaonima.mp3',
            ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/wokeyibaonima.ogg'
            },
            {
            title: '一万个舍不得',
            artist: '庄心妍',
            album: '一万个舍不得',
            cover: 'http://ent.vdolady.com/uploads/allimg/130325/20130325084808733.jpg',
            mp3: 'http://www.nullblogs.com/bowen/HTML5player/music/yiwangeshebude.mp3',
            ogg: 'http://dxsn.gongzuo.in/bowen/HTML5player/music/yiwangeshebude.ogg'
            },];
//初始化
    var time = new Date(),//返回当日的日期和时间   getTime返回 1970 年 1 月 1 日至今的毫秒数
        currentTrack = /*shuffle === 'true' ? time.getTime() % playlist.length : */0,//当前播放，如果不是随机播放，则归零
        trigger = false,
        audio, timeout, isPlaying, playCounts;

    var play = function(){
        audio.play();
        $('.playback').addClass('playing');//音乐播放，则暂停按钮覆盖播放按钮
        timeout = setInterval(updateProgress, 500);//500毫秒调用一次updateProgress，跟新进度条
        isPlaying = true;//表示正在播放
    }

    var pause = function(){//类比播放
        audio.pause();
        $('.playback').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
    }

    // Update progress 更新进度条
    var setProgress = function(value){
        var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
            ratio = value / audio.duration * 100;

        $('.timer').html(parseInt(value/60)+':'+currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }

    var updateProgress = function(){
        setProgress(audio.currentTime);//获得歌曲的当前时间
    }

    // Volume slider
    var setVolume = function(value){
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
        setVolume(ui.value);
        $(this).addClass('enable');
        $('.mute').removeClass('enable');
    }, stop: function(){
        $(this).removeClass('enable');
    }}).children('.pace').css('width', volume * 100 + '%');


    // Switch track
    var switchTrack = function(i){
        if (i < 0){
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length){
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        if (isPlaying == true) play();
    }


    // Fire when track ended
    var ended = function(){
        pause();
        audio.currentTime = 0;
        playCounts++;
        if (continous == true){
            isPlaying = true;
            switchTrack(++currentTrack);
        }
    }
//在加载之前seekable.end(index) 获得可寻址范围的结束位置  确定进度条长度  在css中修改
    var beforeLoad = function(){
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
    }

    // Fire when track loaded completely
    var afterLoad = function(){
        if (autoplay == true) play();
    }

    // Load track
    var loadMusic = function(i){
        var item = playlist[i],
            //把audio标签加入到html文件中，并附带其src
            newaudio = $('<audio>').html('<source src="'+item.mp3+'"><source src="'+item.ogg+'">').appendTo('#player');

        $('.cover').html('<img src="'+item.cover+'" alt="'+item.album+'">');//alt 图像无法显示时，会显示alt中内容
        $('.tag').html('<strong>'+item.title+'</strong><span class="artist">'+item.artist+'</span><span class="album">'+item.album+'</span>');
        // $('#playlist li').removeClass('playing').eq(i).addClass('playing');
        audio = newaudio[0];
        //设置音量
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        //用addEventListener为一个元素上添加多次同一事件
        audio.addEventListener('progress', beforeLoad, false);
        // audio.addEventListener('durationchange', beforeLoad, false);
        //开始播放音乐
        audio.addEventListener('canplay', afterLoad, false);
        //播放完 调用ended函数
        audio.addEventListener('ended', ended, false);
    }


    // 进度条 .slider 滑动条控件  作用：点击修改进度
    // $('.progress .slider').slider({step: 0.1, slide: function(event, ui){
    //     $(this).addClass('enable');
    //     setProgress(audio.duration * ui.value / 100);
    //     clearInterval(timeout);
    // }, stop: function(event, ui){
    //     audio.currentTime = audio.duration * ui.value / 100;
    //     $(this).removeClass('enable');
    //     timeout = setInterval(updateProgress, 500);
    // }});

//点击音量图标
    $('.mute').click(function(){
        if ($(this).hasClass('enable')){
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio.volume).addClass('enable');
            setVolume(0);
        }
    });

    loadMusic(currentTrack);
//播放暂停
    $('.playback').on('click', function(){
        //检查播放暂停按钮样式 playing 是暂停按钮，表示正在播放  .hasClass 检测是否具有该类
        if ($(this).hasClass('playing')){
            pause();
        } else {
            play();
        }
    });
//上一曲
    $('.rewind').on('click', function(){
            switchTrack(--currentTrack);
    });
//下一曲
    $('.fastforward').on('click', function(){
            switchTrack(++currentTrack);
    });

})(jQuery);
