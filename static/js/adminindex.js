$(document).ready(function(){
    function ajax_post(action){
        $.ajax({
            type:"POST",
            url:"/adminindex",
            data: "action="+ action,
            success:function(msg){
                alert(msg);
                list_obj = JSON.parse(msg);
                alert(list_obj)
                alert(list_obj[0].music_name);
            }
        })
    }
    ajax_post("refresh");
});
