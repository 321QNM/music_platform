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
        var item = list_obj[0];
        for (var i = 0; i < 15; i++) {
            $('#list' + i).append('<td>01</td><td>'+item.music_name+'</td><td>'+item.music_artist+'</td>');
        };
    }
});
