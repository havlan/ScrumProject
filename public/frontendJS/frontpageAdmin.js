/**
 * Created by LittleGpNator on 17.01.2017.
 */

function calendarFunction(){
    document.getElementById('list').style.display = "none";
    document.getElementById('calendar').style.display = "block";
}

/*
function listFunction(){
    document.getElementById('list').style.display = "block";
    document.getElementById('calendar').style.display = "none";
}
*/
/*
$(function changeTabs(){

    $('#buttonChangeTab').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
    })

})
*/


$.get('/getAvailableShifts', {}, function(req, res, data){
    console.log( data );
    document.getElementById("freeShiftsNumber").innerHTML = data.responseJSON[0].total;
});
$.get('/getAbsenceNum', {}, function(req, res, data){
    console.log( data );
    document.getElementById("absenceWarning").innerHTML = data.responseJSON[0].total + " fravær til godkjenning";
});
$.get('/getOvertimeNum', {}, function(req, res, data){
    console.log( data );
    document.getElementById("overtimeWarning").innerHTML = data.responseJSON[0].total + " overtid til godkjenning";
});
$.get('/getChangeNum', {}, function(req, res, data){
    console.log( data );
    document.getElementById("changeWarning").innerHTML = data.responseJSON[0].total + " bytteforespørsel";
});