var pagenum = 1;
$(document).ready(function(){
    function ajax_post(action){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action="+ action,
            success:function(msg){
                list_obj = JSON.parse(msg);
                load_list(list_obj);
            }

        })
    }
    ajax_post("refresh");

    function load_list(list_obj){
        for (var i = 0; i < 15; i++) {
            $('#list' + i).append('<td>i</td><td>'+list_obj[i].music_name+'</td><td>'+list_obj[i].music_artist+'</td>');
        };
    }

    // 设置足迹
    $('.page i:even').css("top","-40px");
    // 刷新页码
    updatepageNum(pagenum);
    function updatepageNum(pagenum){
        $('.currentpageNum').html('<strong>当前页码：'+pagenum+'</strong>');
    }
    // 奇偶行不同颜色和鼠标滑过颜色
    // $(".table tbody tr").mouseover(function(){
    //     $(this).css({"background-color":"#87CEEB"});
    // }).mouseout(function(event){
    //     var hased = $(this).hasClass('active_tr');
    //     if (hased) {
    //     }else{
    //         var $index=$(this).index();
    //         if($index%2==0){
    //             $(this).css({"background-color":"#fff"});
    //         }else{
    //             $(this).css({"background-color":"#E4F5FF"});
    //         }
    //     }
    // });
    // 点击选中颜色
    $('tr').click(function(){
        $(this).addClass('active_tr')
        $(this).siblings().removeClass('active_tr');
        alert($(this).text());
    });
    $('#a1').click(function(){
        pagenum = 1;
        $('#a1').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a2').click(function(){
        pagenum = 2;
        $('#a2').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a3').click(function(){
        pagenum = 3;
        $('#a3').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a4').click(function(){
        pagenum = 4;
        $('#a4').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a5').click(function(){
        pagenum = 5;
        $('#a5').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a6').click(function(){
        pagenum = 6;
        $('#a6').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a7').click(function(){
        pagenum = 7;
        $('#a7').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a8').click(function(){
        pagenum = 8;
        $('#a8').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    $('#a9').click(function(){
        pagenum = 9;
        $('#a9').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
        updatepageNum(pagenum);
    });
    // $('#a10').click(function(){
    //         $('#a10').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
    // });

    $('#previous').click(function(){
        if (pagenum>1 && pagenum<11) {
            pagenum = pagenum-1;
            $('#a'+pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            updatepageNum(pagenum);
        }else{
            if (pagenum>10) {
                pagenum = pagenum-1;
                // post
                updatepageNum(pagenum);
            };
        }
    });
    $('#next').click(function(){
        if (pagenum>0 && pagenum<9) {
            pagenum = pagenum+1;
            $('#a'+pagenum).siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
            // post
            updatepageNum(pagenum);
        }else{
            if (pagenum>8) {
                pagenum = pagenum+1;
                $('#a10').siblings('i').addClass('active_i').parent().siblings().find('i').removeClass('active_i');
                // post
                updatepageNum(pagenum);
            };
        }
    });
    $('#jump').click(function(){
        pagenum = $('#pageNum').val();
        alert(pagenum);
        // updatepageNum(pagenum);
    });
});
