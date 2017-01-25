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

$(function () {
    $('#saveEdit').on('click',function (e) {
        e.preventDefault();
        $.ajax({
            url: '/forgotPassword',
            type: 'POST',
            data: $('#forgot').serialize(),
            success: function(data){
                console.log("HORSES FUCK YEAH",JSON.stringify(data));
                alert("Success!");
            }
        });
    })
});

function getRandomColor() {

    var randomColor = "#"+((1<<24)*Math.random()|0).toString(16);

    document.documentElement.style.setProperty('main-bg-color', randomColor);
}
