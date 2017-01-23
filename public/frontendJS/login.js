/**
 * Created by torsku on 23.01.2017.
 */
$(function () {
    $('#klikk').on('click',function () {
        $('#newPassword').modal("show");
    })
});
$(function () {
    $('#saveEdit').on('click',function (e) {
       // e.preventDefault();
        $.ajax({
            url: '/forgotPassword',
            type: 'POST',
            data: {'email': $("#email").val(),'username': $("#username2").val()},
            success: function(data){
                console.log("HORSES FUCK YEAH",JSON.stringify(data));
                alert("Success!");
            }
        });
    })
});