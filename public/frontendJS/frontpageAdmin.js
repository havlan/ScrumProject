
$(document).ready (function(){
    $("#successMessageBox").hide();
    $("#testButton").click(function showAlert() { //TODO
        $("#successMessageBox").alert();
        $("#successMessageBox").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    });
});

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