var pagenum = 1;
var musicnum = -1;
var list_obj;
$(document).ready(function(){

    function ajax_post(action,begin_num,end_num){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action="+ action+ "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_list(list_obj);
            }
        })
    }
    ajax_post("refresh", 0, 13);

    function load_list(list_obj){
        // if (list_obj.length<13) {};
        for (var i = 0; i < list_obj.length; i++) {
            $('#list' + i).html('<td>' + (i+1) + '</td><td>'+list_obj[i].music_name+'</td><td>'+list_obj[i].music_artist+'</td>');
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
        var a = $(this).children().first().html();
        musicnum = a;
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
    // $('#a10').click(function(){
    //         $('#a10').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
    // });

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
        if(musicnum == -1){
            alert("请先选中要操作的歌曲");
        }
        else{
            delete_post("delete", musicnum, (pagenum-1)*13,pagenum*13);
        }
    })
    function delete_post(action, musicnum, begin_num, end_num){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action="+action + "&musicnum="+musicnum + "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_list(list_obj);
            }
        })
    }

    $('.addBt').click(function(){
        showDialog();
    })
    $('.ui-dialog-title-closebutton').click(function(){
        hideDialog();
    })
    function add_post(action){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action=" + action + "&music_name="+$("#music_name").val() +  "&music_artist="+$("#music_artist").val() + "&music_style="+$("#music_style").val() + "&music_zone="+$("#music_zone").val() + "&music_mood="+$("#music_mood").val() + "&music_url="+$("#music_url").val() + "&music_picture_url="+$("#music_picture_url").val(),
            success:function(msg){
                // hideDialog();
                alert("OK");
            }
        })
    }
    $('#submit').click(function(){
        add_post("add_music");
    })
    $("#music_name").blur(function(){
        confirm_post("check_music_name");
    });
    function confirm_post(action){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action=" + action + "&music_name="+$("#music_name").val(),
            success:function(msg){
            if (msg=="yes") {
                    $("#msg").text("歌曲名已存在！");
                    $("#submit").attr("disabled","true");//密码不一致则不能提交
                }
                else{
                    $("#msg").text("");
                    $("#submit").removeAttr('disabled');//密码一致，可以提交
                }
            }
        })
    }

    $('.editBt').click(function(){
        showDialog();
        var temp = musicnum-1;
        alert(temp);
        document.getElementById('music_name').value = list_obj[temp].music_name;
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
});
