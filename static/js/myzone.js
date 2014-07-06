var like_pagenum = -1;
var hate_pagenum = -1;
var like_musicid = -1;
var hate_musicid = -1;
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
            $('#like_list' + i).html('<td>' + (i+1) + '</td><td>'+like_list_obj[i].music_name+'</td><td>'+like_list_obj[i].music_artist+'</td><td class="list_music_id">'+list_obj[i].music_id+'</td>');
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
            $('#hate_list' + i).html('<td>' + (i+1) + '</td><td>'+hate_list_obj[i].music_name+'</td><td>'+hate_list_obj[i].music_artist+'</td><td class="list_music_id">'+list_obj[i].music_id+'</td>');
        };
        for (var i = hate_list_obj.length; i < 10; i++) {
            $('#hate_list' + i).html('');
        }
    };
    // 设置足迹
    $('.page i:even').css("top","-40px");
    // 刷新页码
    update_like_pageNum(like_pagenum);
    update_hate_pageNum(hate_pagenum);
    function update_like_pageNum(like_pagenum){
        $('.current_like_pageNum').html('<strong>当前页码：'+like_pagenum+'</strong>');
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
        like_list_post("like_page_change",0,like_pagenum*10);
        $('#like_a1').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a2').click(function(){
        like_pagenum = 2;
        like_list_post("like_page_change",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a3').click(function(){
        like_pagenum = 3;
        like_list_post("like_page_change",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a3').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a4').click(function(){
        like_pagenum = 4;
        like_list_post("like_page_change",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#like_a5').click(function(){
        like_pagenum = 5;
        like_list_post("like_page_change",(like_pagenum-1)*10,like_pagenum*10);
        $('#like_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_like_pageNum(like_pagenum);
    });
    $('#hate_a1').click(function(){
        hate_pagenum = 1;
        hate_list_post("hate_page_change",0,hate_pagenum*10);
        $('#hate_a1').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a2').click(function(){
        hate_pagenum = 2;
        hate_list_post("hate_page_change",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a3').click(function(){
        hate_pagenum = 3;
        hate_list_post("hate_page_change",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a3').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a4').click(function(){
        hate_pagenum = 4;
        hate_list_post("hate_page_change",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });
    $('#hate_a5').click(function(){
        hate_pagenum = 5;
        hate_list_post("hate_page_change",(hate_pagenum-1)*10,hate_pagenum*10);
        $('#hate_a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        update_hate_pageNum(hate_pagenum);
    });


    $('#like_previous').click(function(){
        if (like_pagenum>1 && like_pagenum<7) {
            like_pagenum = like_pagenum-1;
            like_list_post("like_page_change",(like_pagenum-1)*13,like_pagenum*13);
            $('#like_a'+like_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            update_like_pageNum(like_pagenum);
        }else{
            if (like_pagenum>6) {
                like_pagenum = like_pagenum-1;
                like_list_post("like_page_change",(like_pagenum-1)*13,like_pagenum*13);
                update_like_pageNum(like_pagenum);
            };
        }
    });
    $('#hate_previous').click(function(){
        if (hate_pagenum>1 && hate_pagenum<7) {
            hate_pagenum = hate_pagenum-1;
            hate_list_post("hate_page_change",(hate_pagenum-1)*13,hate_pagenum*13);
            $('#hate_a'+hate_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            update_hate_pageNum(hate_pagenum);
        }else{
            if (hate_pagenum>6) {
                hate_pagenum = hate_pagenum-1;
                hate_list_post("hate_page_change",(hate_pagenum-1)*13,hate_pagenum*13);
                update_hate_pageNum(hate_pagenum);
            };
        }
    });
    $('#like_next').click(function(){
        if (like_pagenum>0 && like_pagenum<5) {
            like_pagenum = like_pagenum+1;
            $('#like_a'+like_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            like_list_post("like_page_change",(like_pagenum-1)*13,like_pagenum*13);
            update_like_pageNum(like_pagenum);
        }else{
            if (like_pagenum>4) {
                like_pagenum = like_pagenum+1;
                $('#like_a6').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
                like_list_post("like_page_change",(like_pagenum-1)*13,like_pagenum*13);
                update_like_pageNum(like_pagenum);
            };
        }
    });
    $('#hate_next').click(function(){
        if (hate_pagenum>0 && hate_pagenum<5) {
            hate_pagenum = hate_pagenum+1;
            $('#hate_a'+hate_pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            hate_list_post("hate_page_change",(hate_pagenum-1)*13,hate_pagenum*13);
            update_hate_pageNum(hate_pagenum);
        }else{
            if (hate_pagenum>4) {
                hate_pagenum = hate_pagenum+1;
                $('#hate_a6').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
                hate_list_post("hate_page_change",(hate_pagenum-1)*13,hate_pagenum*13);
                update_hate_pageNum(hate_pagenum);
            };
        }
    });
    $('#like_jump').click(function(){
        like_pagenum = $('#like_pageNum').val();
        like_list_post("like_page_change",(like_pagenum-1)*13,like_pagenum*13);
        update_like_pageNum(like_pagenum);
    });
    $('#hate_jump').click(function(){
        hate_pagenum = $('#hate_pageNum').val();
        hate_list_post("hate_page_change",(hate_pagenum-1)*13,hate_pagenum*13);
        update_hate_pageNum(hate_pagenum);
    });

    $('.like_delBt').click(function(){
        if(like_musicid < 0){
            alert("请先选中要操作的歌曲");
        }
        else{
            like_delete_post("delete", "like", like_musicid, (pagenum-1)*13,pagenum*13);
        }
    })
    function delete_post(action, kind, like_musicid, begin_num, end_num){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+action + "&like_musicid="+like_musicid + "&begin_num="+ begin_num +"&end_num="+end_num,
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
            hate_delete_post("delete", "hate", hate_musicid, (pagenum-1)*13,pagenum*13);
        }
    })
    function delete_post(action, kind, hate_musicid, begin_num, end_num){
        $.ajax({
            type:"POST",
            url:"/myzone",
            data: "action="+action + "&hate_musicid="+hate_musicid + "&begin_num="+ begin_num +"&end_num="+end_num,
            success:function(msg){
                hate_list_obj = JSON.parse(msg);
                // alert(list_obj);
                load_hate_list(hate_list_obj);
            }
        })
    }

})
