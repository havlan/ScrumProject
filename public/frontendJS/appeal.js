function absenceFunction(){
    document.getElementById('absenceAppeal').style.display = "block";
    document.getElementById('changeAppeal').style.display = "none";
    document.getElementById('changeToAppeal').style.display = "none";
    document.getElementById('saveAppeal').style.display = "block";
}
function changeFunction(){
    document.getElementById('absenceAppeal').style.display = "none";
    document.getElementById('changeAppeal').style.display = "block";
    document.getElementById('changeToAppeal').style.display = "none";
    document.getElementById('saveAppeal').style.display = "block";
}
function changeToFunction(){
    document.getElementById('absenceAppeal').style.display = "none";
    document.getElementById('changeAppeal').style.display = "none";
    document.getElementById('changeToAppeal').style.display = "block";
    document.getElementById('saveAppeal').style.display = "block";
}

$(document).ready(function(){
    $("#includedContent").load("menu");
});

