/**
 * Created by LittleGpNator on 13.01.2017.
 */

$(document).ready(function(){ // syntax for å hente data når dokument (html) er lastet inn
    $.get('/PersonalInfo', {}, function(req, res, data){

        //console.log(data);
        //console.log(data.responseJSON[2]);

        document.getElementById("name").innerHTML = data.responseJSON[0].name;
        document.getElementById("type").innerHTML = data.responseJSON[0].type_name;
        document.getElementById("employee_id").innerHTML = data.responseJSON[0].employee_id;
        document.getElementById("responsibility_allowed").innerHTML = data.responseJSON[0].responsibility_allowed;
        document.getElementById("phone").innerHTML = data.responseJSON[0].phone_nr;
    });
});