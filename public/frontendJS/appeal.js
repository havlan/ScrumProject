function absenceFunction(){
    document.getElementById('absenceAppeal').style.display = "block";
    document.getElementById('changeAppeal').style.display = "none";
    document.getElementById('changeToAppeal').style.display = "none";
    document.getElementById('overtimeAppeal').style.display = "none";

}
function changeFunction(){
    document.getElementById('absenceAppeal').style.display = "none";
    document.getElementById('changeAppeal').style.display = "block";
    document.getElementById('changeToAppeal').style.display = "none";
    document.getElementById('overtimeAppeal').style.display = "none";
}
function changeToFunction(){
    document.getElementById('absenceAppeal').style.display = "none";
    document.getElementById('changeAppeal').style.display = "none";
    document.getElementById('changeToAppeal').style.display = "block";
    document.getElementById('overtimeAppeal').style.display = "none";
}

function overtimeFunction(){
    document.getElementById('absenceAppeal').style.display = "none";
    document.getElementById('changeAppeal').style.display = "none";
    document.getElementById('changeToAppeal').style.display = "none";
    document.getElementById('overtimeAppeal').style.display = "block";
}


$(document).ready (function(){
    $("#successMessageBox").hide();
    $("#testButton").click(function showAlert() { //TODO
        $("#successMessageBox").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    });
});