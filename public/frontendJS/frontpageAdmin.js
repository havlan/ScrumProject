/**
 * Created by LittleGpNator on 17.01.2017.
 */




$(document).ready(function(){ // syntax for å hente data når dokument (html) er lastet inn
    $("#includedContent").load("menu");
});

function calendarFunction(){
    document.getElementById('list').style.display = "none";
    document.getElementById('calendar').style.display = "block";
}
function listFunction(){
    document.getElementById('list').style.display = "block";
    document.getElementById('calendar').style.display = "none";
}
//TODO
$(function changeTabs(){

    $('#buttonChangeTab').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
    })

})