/**
 * Created by o_A_l on 13.01.2017.
 */


//var test1 = require('../../controllers/testReq');
//var bodyParser = require('body-parser');
//var testinfo;
/*
$(document).ready(function getInfo(){
    $.get("/getEmployee",{},function (req, res,data) {
        document.getElementById("hoursInput").innerHTML = data.responeJSON[0].total_hours;
        document.getElementById("employe_idInput").innerHTML = data.responeJSON[0].employee_id;
        document.getElementById("seniorityInput").innerHTML = data.responeJSON[0].seniority;
        document.getElementById("respInput").innerHTML = data.responeJSON[0].responsibility_allowed;
        document.getElementById("TypeInput").innerHTML = data.responseJSON[0].type_name;
        document.getElementById("nameInput2").innerHTML = data.responseJSON[0].name;
        document.getElementById("persidInput").innerHTML = data.responeJSON[0].pers_id;
    });
});
*/
function onClick() {
    alert("ALLAH");
    $.post("/updateEmployee",{
        phone_nr: document.getElementById("phoneInput").value,
        total_hours:  document.getElementById("hoursInput").value,
        employee_id: document.getElementById("employee_idInput").value,
        email: document.getElementById("emailInput").value,
        seniority :  document.getElementById("seniorityInput").value,
        responsibility_allowed:  document.getElementById("respInput").value,
        type_name:  document.getElementById("typeInput").value,
        name: document.getElementById("nameInput2").value,
        address: document.getElementById("addressInput").value,
        pers_id: document.getElementById("persidInput").value,
       // employee_id: document.getElementById("employee_idInput").value
    });
}

