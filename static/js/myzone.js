var like_pagenum = 1;
var hate_pagenum = 1;
var like_musicid = -1;
var hate_musicid = -1;
var info_obj;
$(document).ready(function(){
    function like_list_post(action,kind,begin_num,end_num){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+ action+ "&kind="+ kind +"&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                like_list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_like_list(like_list_obj);
            }
        })
    }
    like_list_post("refresh","like", 0, 10);

    function load_like_list(like_list_obj){
        for (var i = 0; i < like_list_obj.length; i++) {
            $('#like_list' + i).html('<td>' + (i+1) + '</td><td>'+like_list_obj[i].music_name+'</td><td>'+like_list_obj[i].music_artist+'</td><td class="list_music_id">'+like_list_obj[i].music_id+'</td>');
        };
        for (var i = like_list_obj.length; i < 10; i++) {
            $('#like_list' + i).html('');
        }
    };


    function hate_list_post(action,kind,begin_num,end_num){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+ action+ "&kind="+ kind +"&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                hate_list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_hate_list(hate_list_obj);
            }
        })
    }
    hate_list_post("refresh","hate", 0, 10);

    function load_hate_list(hate_list_obj){
        for (var i = 0; i < hate_list_obj.length; i++) {
            $('#hate_list' + i).html('<td>' + (i+1) + '</td><td>'+hate_list_obj[i].music_name+'</td><td>'+hate_list_obj[i].music_artist+'</td><td class="list_music_id">'+hate_list_obj[i].music_id+'</td>');
        };
        for (var i = hate_list_obj.length; i < 10; i++) {
            $('#hate_list' + i).html('');
        }
    };

    info_post("refresh","info")
    function info_post(action, kind){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+ action+ "&kind="+ kind,
            success:function(msg){
                info_obj = JSON.parse(msg);
                load_info(info_obj);
            }
        })
    }
    function load_info(info_obj){
        $('#myzone_username').html(info_obj.username);
        $('#myzone_bio').html(info_obj.bio);
        $('#myzone_gravatar').html('<img class="user_image" src="{{ static_url("'+ info_obj.gravatar +'")}}">');
    }

    // 设置足迹
    $('.page i:even').css("top","-40px");
    // 刷新页码
    update_like_pageNum(like_pagenum);
    update_hate_pageNum(hate_pagenum);
    function update_like_pageNum(like_pagenum){
        $('.current_like_pageNum').html('<strong>当前页码：'+like_pagenum+'</strong>');
    }

    function update_hate_pageNum(hate_pagenum){
        $('.current_hate_pageNum').html('<strong>当前页码：'+hate_pagenum+'</strong>');
    }

    // 点击选中 获取ID
    $('.like').click(function(){
        $(this).addClass('active_tr')
        $(this).siblings().removeClass('active_tr');

        like_musicid = $(this).children().last().html();
    });
    $('.hate').click(function(){
        $(this).addClass('active_tr')
        $(this).siblings().removeClass('active_tr');

        hate_musicid = $(this).children().last().html();
    });

    // 换页效果
    $('#like_a1').click(function(){
        like_pagenum = 1;
        like_list_post("page_change","like",0,like_pagenum*10);
        $('#like_a1').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a2').click(function(){
        like_pagenum = 2;
        like_list_post("page_change","like",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a3').click(function(){
        like_pagenum = 3;
        like_list_post("page_change","like",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a3').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a4').click(function(){
        like_pagenum = 4;
        like_list_post("page_change","like",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a4').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a5').click(function(){
        like_pagenum = 5;
        like_list_post("page_change","like",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a5').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#hate_a1').click(function(){
        hate_pagenum = 1;
        hate_list_post("page_change","hate",0,hate_pagenum*10);
        $('#hate_a1').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a2').click(function(){
        hate_pagenum = 2;
        hate_list_post("page_change","hate",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a3').click(function(){
        hate_pagenum = 3;
        hate_list_post("page_change","hate",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a3').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a4').click(function(){
        hate_pagenum = 4;
        hate_list_post("page_change","hate",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a4').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a5').click(function(){
        hate_pagenum = 5;
        hate_list_post("page_change","hate",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a5').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });


    $('#like_previous').click(function(){
        if (like_pagenum>1 && like_pagenum<7) {
            like_pagenum = like_pagenum-1;
            like_list_post("page_change", "like", (like_pagenum-1)*10,like_pagenum*10);
            $('#like_a'+like_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            update_like_pageNum(like_pagenum);
        }else{
            if (like_pagenum>6) {
                like_pagenum = like_pagenum-1;
                like_list_post("page_change", "like",(like_pagenum-1)*10,like_pagenum*10);
                update_like_pageNum(like_pagenum);
            };
        }
    });
    $('#hate_previous').click(function(){
        if (hate_pagenum>1 && hate_pagenum<7) {
            hate_pagenum = hate_pagenum-1;
            hate_list_post("page_change","hate", (hate_pagenum-1)*10,hate_pagenum*10);
            $('#hate_a'+hate_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            update_hate_pageNum(hate_pagenum);
        }else{
            if (hate_pagenum>6) {
                hate_pagenum = hate_pagenum-1;
                hate_list_post("page_change","hate",(hate_pagenum-1)*10,hate_pagenum*10);
                update_hate_pageNum(hate_pagenum);
            };
        }
    });
    $('#like_next').click(function(){
        if (like_pagenum>0 && like_pagenum<5) {
            like_pagenum = like_pagenum+1;
            $('#like_a'+like_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            like_list_post("page_change", "like", (like_pagenum-1)*10,like_pagenum*10);
            update_like_pageNum(like_pagenum);
        }else{
            if (like_pagenum>4) {
                like_pagenum = like_pagenum+1;
                $('#like_a6').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
                like_list_post("page_change","like", (like_pagenum-1)*10,like_pagenum*10);
                update_like_pageNum(like_pagenum);
            };
        }
    });
    $('#hate_next').click(function(){
        if (hate_pagenum>0 && hate_pagenum<5) {
            hate_pagenum = hate_pagenum+1;
            $('#hate_a'+hate_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            hate_list_post("page_change", "hate", (hate_pagenum-1)*10,hate_pagenum*10);
            update_hate_pageNum(hate_pagenum);
        }else{
            if (hate_pagenum>4) {
                hate_pagenum = hate_pagenum+1;
                $('#hate_a6').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
                hate_list_post("page_change","hate", (hate_pagenum-1)*10,hate_pagenum*10);
                update_hate_pageNum(hate_pagenum);
            };
        }
    });
    $('#like_jump').click(function(){
        like_pagenum = parseInt( $('#like_pageNum').val(), 10);
        like_list_post("page_change","like",(like_pagenum-1)*10,like_pagenum*10);
        update_like_pageNum(like_pagenum);
    });
    $('#hate_jump').click(function(){
        hate_pagenum = parseInt( $('#hate_pageNum').val(), 10);
        hate_list_post("page_change","hate",(hate_pagenum-1)*10,hate_pagenum*10);
        update_hate_pageNum(hate_pagenum);
    });

    $('.like_delBt').click(function(){
        if(like_musicid < 0){
            alert("请先选中要操作的歌曲");
        }
        else{
            like_delete_firm();
        }
    })
    function like_delete_firm()
    {//利用对话框返回的值 （true 或者 false）
        if(confirm("确认删除？"))
        {//如果是true
            like_delete_post("delete", "like", like_musicid, (like_pagenum-1)*10,like_pagenum*10);
            like_musicid = -1;
            hate_musicid = -1;
            $('tr').removeClass('active_tr');
        }
    }
    function like_delete_post(action, kind, like_musicid, begin_num, end_num){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+action + "&kind=" + kind + "&like_musicid="+like_musicid + "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                like_list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_like_list(like_list_obj);
            }
        })
    }
    $('.hate_delBt').click(function(){
        if(hate_musicid < 0){
            alert("请先选中要操作的歌曲");
        }
        else{
            hate_delete_firm();
        }
    })
    function hate_delete_firm()
    {//利用对话框返回的值 （true 或者 false）
        if(confirm("确认删除？"))
        {//如果是true
            hate_delete_post("delete", "hate", hate_musicid, (hate_pagenum-1)*10,hate_pagenum*10);
            like_musicid = -1;
            hate_musicid = -1;
            $('tr').removeClass('active_tr');
        }
    }
    function hate_delete_post(action, kind, hate_musicid, begin_num, end_num){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+action + "&kind=" + kind + "&hate_musicid="+hate_musicid + "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                hate_list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_hate_list(hate_list_obj);
            }
        })
    }


    $('#myzone_gravatar').click(function(){
        showDialog();
        document.getElementById('bio').value = info_obj.bio;
    })
    $('.ui-dialog-title-closebutton').click(function(){
        hideDialog();
    })
    $('#bio_submit').click(function(){
        edit_bio_post("edit_bio");
        hideDialog();
        return false;
    })
    // $('#gravatar_submit').click(function(){
    //     edit_gravatar_post("edit_gravatar");
    //     hideDialog();
    //     return false;
    // })
    function edit_bio_post(action){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action=" + action + "&bio="+$("#bio").val(),
            success:function(msg){
                info_obj = JSON.parse(msg);
                load_info(info_obj);
            }
        })
    };
    // function edit_gravatar_post(action){
    //     $.ajax({
    //         type:"POST",
    //         url:"/",
    //         data: "action=" + action + "&bio="+$("#gravatar_input").val(),
    //         success:function(msg){
    //             info_obj = JSON.parse(msg);
    //             load_info(info_obj);
    //         }
    //     })
    // };


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

})
