/**
 * Created by torsku on 23.01.2017.
 */
/*$(function () {
    $('#klikk').on('click',function () {
        $('#newPassword').modal("show");
    })
});*/
/*$(function () {
    $('#forgot_password').on('click',function () {
        //e.preventDefault();
        $.ajax({
            url: '/forgotPw',
            type: 'POST',
            data: {'email': $("#email").val(),'username': $("#username2").val()},
            success: function(data){
                console.log(JSON.stringify(data));
                //document.getElementById('newUserFeedback').innerHTML("Success");
            }
        });
    })
});*/
$(function(){
    $('#loginbtn').click(function(){
        $.ajax({
            url:'/login',
            type:'POST',
            data: { 'username': $('#username').val(),'password': $('#password').val()},
            success: function(data){
                console.log("FUCK YEAH");
            },
            error : function(err){
                $("#feedbacklogin").innerHTML = "Prøv igjen.";
            }
        })
    })
})