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

    $("#successMessageBox").hide();
    $("#errorMessageBox").hide();
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
                document.getElementById("successMessage").innerHTML = "Success!";
                showSuccessMessage();
            },
            error: function(xhr){
                if(xhr.status==404){
                    document.getElementById("errorMessage").innerHTML = "not found";
                    showErrorMessage();
                } else {
                    document.getElementById("errorMessage").innerHTML = "internal server error";
                    showErrorMessage();
                }
            }
        });
    })
});

function getRandomColor() {

    var randomColor = "#"+((1<<24)*Math.random()|0).toString(16);

    document.documentElement.style.setProperty('main-bg-color', randomColor);
}

function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
function showErrorMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}