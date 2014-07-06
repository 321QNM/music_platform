var pagenum = 1;
var musicid = -1;
var musicnum = -1;
var list_obj;
$(document).ready(function(){

    function ajax_post(action,begin_num,end_num){
        $.ajax({
            type:"POST",
            url:"/musicsearch",
            data: "action="+ action+ "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                list_obj = JSON.parse(msg);
                load_list(list_obj);
            }
        })
    }
    ajax_post("refresh", 0, 13);

    function load_list(list_obj){

        for (var i = 0; i < list_obj.length; i++) {
            $('#list' + i).html('<td>' + (i+1) + '</td><td>'+list_obj[i].music_name+'</td><td>'+list_obj[i].music_artist+'</td><td>'+list_obj[i].music_style+'</td><td>'+list_obj[i].music_zone+'</td><td>'+list_obj[i].music_mood+'</td><td>'+list_obj[i].music_url+'</td><td>'+list_obj[i].music_picture_url+'</td><td>'+list_obj[i].music_publish_date+'</td><td class="list_music_id">'+list_obj[i].music_id+'</td>');
        };
        for (var i = list_obj.length; i < 13; i++) {
            $('#list' + i).html('');
        }
    };

    // 设置足迹
    $('.page i:even').css("top","-40px");
    // 刷新页码
    updatepageNum(pagenum);
    function updatepageNum(pagenum){
        $('.currentpageNum').html('<strong>当前页码：'+pagenum+'</strong>');
    }
    // 点击选中颜色
    $('tr').click(function(){
        $(this).addClass('active_tr')
        $(this).siblings().removeClass('active_tr');

        musicid = $(this).children().last().html();
        musicnum = $(this).children().first().html();
    });

    // 换页效果
    $('#a1').click(function(){
        pagenum = 1;
        ajax_post("page_change",0,pagenum*13);
        $('#a1').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a2').click(function(){
        pagenum = 2;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a3').click(function(){
        pagenum = 3;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a3').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a4').click(function(){
        pagenum = 4;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a4').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a5').click(function(){
        pagenum = 5;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a5').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a6').click(function(){
        pagenum = 6;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a6').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a7').click(function(){
        pagenum = 7;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a7').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a8').click(function(){
        pagenum = 8;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a8').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a9').click(function(){
        pagenum = 9;
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        $('#a9').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });

    $('#previous').click(function(){
        if (pagenum>1 && pagenum<11) {
            pagenum = pagenum-1;
            ajax_post("page_change",(pagenum-1)*13,pagenum*13);
            $('#a'+pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            updatepageNum(pagenum);
        }else{
            if (pagenum>10) {
                pagenum = pagenum-1;
                ajax_post("page_change",(pagenum-1)*13,pagenum*13);
                updatepageNum(pagenum);
            };
        }
    });
    $('#next').click(function(){
        if (pagenum>0 && pagenum<9) {
            pagenum = pagenum+1;
            $('#a'+pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            ajax_post("page_change",(pagenum-1)*13,pagenum*13);
            updatepageNum(pagenum);
        }else{
            if (pagenum>8) {
                pagenum = pagenum+1;
                $('#a10').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
                ajax_post("page_change",(pagenum-1)*13,pagenum*13);
                updatepageNum(pagenum);
            };
        }
    });
    $('#jump').click(function(){
        pagenum = $('#pageNum').val();
        ajax_post("page_change",(pagenum-1)*13,pagenum*13);
        updatepageNum(pagenum);
    });



    $('.delBt').click(function(){
        if(musicid < 0){
            alert("请先选中要操作的歌曲");
        }
        else{
            firm();
        }
    })
    function firm()
    {//利用对话框返回的值 （true 或者 false）
        if(confirm("确认删除？"))
        {//如果是true
            delete_post("delete", musicid, (pagenum-1)*13,pagenum*13);
        }
    }

    function delete_post(action, musicid, begin_num, end_num){
        $.ajax({
            type:"POST",
            url:"/musicsearch",
            data: "action="+action + "&musicid="+musicid + "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                list_obj = JSON.parse(msg);
                load_list(list_obj);
            }
        })
    }

    $('.ui-dialog-title-closebutton').click(function(){
        hideDialog();
    })

    function edit_post(action,begin_num,end_num){
        $.ajax({
            type:"POST",
            url:"/musicsearch",
            data: "action=" + action + "&begin_num="+ begin_num +"&end_num="+end_num+ "&music_id=" + musicid + "&music_name="+$("#music_name").val() +  "&music_artist="+$("#music_artist").val() + "&music_style="+$("#music_style").val() + "&music_zone="+$("#music_zone").val() + "&music_mood="+$("#music_mood").val() + "&music_url="+$("#music_url").val() + "&music_picture_url="+$("#music_picture_url").val() + "&music_publish_date=" + $("#music_publish_date").val(),
            success:function(msg){
                list_obj = JSON.parse(msg);
                load_list(list_obj);
            }
        })
    };
    $('#submit').click(function(){
            edit_post("edit_music",(pagenum-1)*13,pagenum*13);
            hideDialog();
            return false;
    })

    $('.editBt').click(function(){
        if (musicnum < 0) {
            alert("请先选中要操作的歌曲");
        }
        else{
            is_edit = 1;
            showDialog();
            var temp = musicnum-1;
            document.getElementById('music_name').value = list_obj[temp].music_name;
            document.getElementById('music_artist').value = list_obj[temp].music_artist;
            document.getElementById('music_style').value = list_obj[temp].music_style;
            document.getElementById('music_zone').value = list_obj[temp].music_zone;
            document.getElementById('music_mood').value = list_obj[temp].music_mood;
            document.getElementById('music_url').value = list_obj[temp].music_url;
            document.getElementById('music_picture_url').value = list_obj[temp].music_picture_url;
            document.getElementById('music_publish_date').value = list_obj[temp].music_publish_date;
        }
    })

    //  获取元素对象
    function g(id){ return document.getElementById(id); }

    //  自动居中 - 登录浮层 ( el = Elemenet)
    function autoCenter( el ){
        var bodyW = document.documentElement.clientWidth;
        var bodyH = document.documentElement.clientHeight;

        var elW = el.offsetWidth;
        var elH = el.offsetHeight;

        el.style.left = ( bodyW - elW  ) / 2  + 'px';
        el.style.top  = ( bodyH - elH  ) / 2  + 'px';
    }

    //  自动全屏 - 遮罩
    function fillToBody( el ){
        el.style.width   =  document.documentElement.clientWidth  +'px';
        el.style.height  =  document.documentElement.clientHeight +'px';
    }

    var mouseOffsetX = 0;   //  偏移
    var mouseOffsetY = 0;

    var isDraging = false;  //  是否可拖拽的标记

    //  鼠标事件1 － 在标题栏上按下（要计算鼠标相对拖拽元素的左上角的坐标，并且标记元素为可拖动）
    g('dialogTitle').addEventListener('mousedown',function(e){
        var e = e || window.event;
        mouseOffsetX = e.pageX - g('dialog').offsetLeft;
        mouseOffsetY = e.pageY - g('dialog').offsetTop;
        isDraging = true;
    })
    //  鼠标事件2 － 鼠标移动时（要检测，元素是否可标记为移动，如果是，则更新元素的位置，到当前鼠标的位置［ps：要减去第一步中获得的偏移］）
    document.onmousemove = function( e ){
        var e = e || window.event;

        var mouseX = e.pageX;   // 鼠标当前的位置
        var mouseY = e.pageY;

        var moveX = 0;  //  浮层元素的新位置
        var moveY = 0;

        if( isDraging === true ){

            moveX = mouseX - mouseOffsetX;
            moveY = mouseY - mouseOffsetY;

            //  范围限定   moveX > 0 并且  moveX < (页面最大宽度 - 浮层的宽度)
            //            moveY > 0 并且  movey < (页面最大高度 - 浮层的高度)

            var pageWidth  = document.documentElement.clientWidth ;
            var pageHeight = document.documentElement.clientHeight ;

            var dialogWidth  = g('dialog').offsetWidth;
            var dialogHeight = g('dialog').offsetHeight;

            var maxX = pageWidth - dialogWidth;
            var maxY = pageHeight- dialogHeight;

            moveX = Math.min( maxX , Math.max(0,moveX) );
            moveY = Math.min( maxY , Math.max(0,moveY) );

            g('dialog').style.left = moveX + 'px';
            g('dialog').style.top  = moveY + 'px';
        }

    }


    //  鼠标事件3 － 鼠标松开的时候（标记元素为不可拖动即可）
    document.onmouseup = function(){
        isDraging = false;
    }

    //  展现登录浮层
    function showDialog(){
        g('dialog').style.display = 'block';
        g('mask').style.display = 'block';
        autoCenter(g('dialog'));
        fillToBody( g('mask') );
    }

    //  隐藏登录浮层
    function hideDialog(){
        g('dialog').style.display = 'none';
        g('mask').style.display = 'none';
    }

    onresize =function(){
        autoCenter(g('dialog'));
        fillToBody( g('mask') );
    }

    $(document).keydown(function(event){
        if (event.which == 13) {
            $("form").submit();
        };
    });
});
