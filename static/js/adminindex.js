var list_obj;
$(document).ready(function(){
    function ajax_post(action){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action="+ action,
            success:function(msg){
                list_obj = JSON.parse(msg);
                alert(list_obj[0].music_name);
            }
        })
    }
    ajax_post("refresh");

    // for (var i=0; i < list_obj.length; i++){
    var item = list_obj[0];
    $('#list1').append('<td>01</td><td>'+item.music_name+'</td><td>'+item.music_artist+'</td>');
    }
});
