/**
 * Created by torsku on 23.01.2017.
 */
$(function () {
    $('#klikk').on('click',function () {
        $('#newPassword').modal("show");
    })
});
$(function () {
    $('#forgot password').on('click',function () {
        e.preventDefault();
        $.ajax({
            url: '/updateEmployee',
            type: 'POST',
            data: {'email': $("#email").val(),'username': $("#username2").val()},
            success: function(data){
                console.log(JSON.stringify(data));
                //document.getElementById('newUserFeedback').innerHTML("Success");
            }
        });
    })
});