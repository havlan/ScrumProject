/**
 * Created by torsku on 23.01.2017.
 */

/**
 * Opens modal when "forgotten password?" is clicked
 * @function
 */
$(function () {
    $('#klikk').on('click',function () {
        $('#newPassword').modal("show");
    })
});
/**
 * hides success and error message box
 * @function
 */
$( document ).ready(function() {
    $("#successMessageBox").hide();
    $("#errorMessageBox").hide();
});

/**
 * When clicked an e-mail is sent to the user
 * @function
 * @param user input
 */
$(function () {
    $('#saveEdit').on('click',function (e) {
        e.preventDefault();
        $.ajax({
            url: '/forgotPassword',
            type: 'POST',
            data: $('#forgot').serialize(),
            success: function(data){
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


/**
 * Displays success message
 * @function
 */
function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
/**
 * Displays error message
 * @function
 */
function showErrorMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}