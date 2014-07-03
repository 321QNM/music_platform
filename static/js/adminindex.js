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
});
