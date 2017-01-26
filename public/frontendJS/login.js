/**
 * Created by torsku on 23.01.2017.
 */
$(function () {
    $('#klikk').on('click',function () {
        $('#newPassword').modal("show");
    })
});

$( document ).ready(function() {
    getRandomColor();
});
window.onload = function(){
    function handleinput(){
        if(document.loginform.username.value == ""){
            document.getElementById("loginfeedback").innerHTML = "You must enter a username";
            return false;
        }

        if(document.loginform.password.value == ""){
            document.getElementById("loginfeedback").innerHTML = "You must enter a password";
            return false;
        }
    }

    document.getElementById("loginform").onsubmit = handleinput;
}

$(function () {
    $('#saveEdit').on('click',function (e) {
        e.preventDefault();
        $.ajax({
            url: '/forgotPassword',
            type: 'POST',
            data: $('#forgot').serialize(),
            success: function(data){
                document.getElementById('forgotpwfeedback').innerHTML = "<strong>Dette gikk bra.</strong>";
            },
            error:function (xhr, ajaxOptions, thrownError) {
                if (xhr.status == 404) {
                    document.getElementById('forgotpwfeedback').innerHTML = "<strong>Sjekk brukernavn og epost.</strong>";
                } else {
                    document.getElementById('forgotpwfeedback').innerHTML = "<strong>Sjekk brukernavn og epost, eller kontakt administrator.</strong>";
                }
            }
        });
    })
});

function getRandomColor() {

    var randomColor = "#"+((1<<24)*Math.random()|0).toString(16);

    document.documentElement.style.setProperty('main-bg-color', randomColor);
}
