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
})
