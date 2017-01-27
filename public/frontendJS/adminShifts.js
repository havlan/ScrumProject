

var departments     = [];
var employeesSyk;
var employeesHelp   = [];
var employeesAnnet  = [];
var eventId;
var fillShiftList;
var currShiftId;


$(document).ready(function() {

    $('#calendarx').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,listMonth'
        },
        firstDay: 1,
        displayEventEnd: true,
        timeFormat: 'H:mm',
        eventLimit: true,
        locale: 'nb',
        weekNumbers:true,
        navLinks: true,
        editable: false,
        height: 'auto',
        eventColor: '#000000', //default event color //can be set individually
        eventTextColor: '#ffffff', //default event text color
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        eventSources: [
            {
                url: '/getPossibleShiftsEvents', // use the `url` property
                color: '#ffe066',    // an option!
                textColor: 'black'  // an option!
            }],
        eventClick:  function(event, jsEvent, view) {
            getAvailableEmpForShift(event.id);
            $('#fillShiftModal').modal();
            eventId = event.id;
            currShiftId = event.id;
        }


    });

    var modal = document.getElementById('adminNewShiftModal');
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    };

    createNumberDropdown();

});

function getAvailableEmpForShift(id) {

    $.ajax({
        url: '/getEmpForShiftDateAll', //this is the submit URL
        type: 'POST',
        data: {'shift_id': id},
        success: function(data){
            console.log(data);
            fillShiftList = data;

            for (var i = 0; i < data.length; i++) {
                var option = $('<option />').text(data[i].name);
                $('#choosePerson').append(option);
            }

            //lag dropdown i modal
        },
        failure: function(err) {console.log("Error"+err);}
    });



}

function saveFillShift() {
    //runs when lagre button is clicked
    //checks for valid input

    //ajax post

    var emp_id = fillShiftList[$("#choosePerson").prop('selectedIndex')].employee_id;


    $.ajax({
        url: '/postShift_has_employee', //this is the submit URL
        type: 'POST',
        data: {'shift_id': currShiftId,'employee_id': emp_id},
        success: function(data){
            employeesSyk = data;

            location.reload();
            //FEEDBACK
        },
        failure: function(err) {
            console.log("Error"+err);
            //FEEDBACK
        }
    });

    $('#fillShiftModal').modal("hide");
}





function createNumberDropdown(){
    console.log("kjører num drop");
    $('#chooseNumber').append($('<option />').text(0));
    for (var i = 4; i < 21; i++) {
        var option = $('<option />').text(i);
        $('#chooseNumber').append(option);
    }
}
//finds dispersion and calls createPeopleDropdown with correct numbers
function getDispersion(res) {
    var ant = Number(res.value);
    console.log(ant);
    var syk;
    if(ant%10 == 3 || (ant/5)%1<0.5) {
        syk = Math.floor(ant/5);
    } else {
        syk = Math.round(ant/5);
    }
    var hjelp;
    if(ant%10 == 9 || (ant*0.3)%1<=0.5) {
        hjelp = Math.floor(ant*0.3);
    } else {
        hjelp = Math.round(ant*0.3);
    }
    var annet = Math.round(ant/2);
    getData(syk, hjelp, annet, createPeopleDropdown);
}

function closeModal() {
    $("#adminNewShiftModal").modal('hide');
}

function getData(antSyk, antHjelp, antAnnet, cb) {
    $.ajax({
        url: '/getEmpForShiftDate', //this is the submit URL
        type: 'POST',
        data: {'shift_id': eventId,'type_name': "Sykepleier"},
        success: function(data){
            console.log("event id = "+eventId);
            console.log(data);
            employeesSyk = data;

            console.log(employeesSyk);


            createPeopleDropdown(antSyk, antHjelp, antAnnet);

        },
        failure: function(err) {console.log("Error"+err);}
    });
}

$.get('/getEmployee', {}, function(req, res, data){
    employeesHelp = data.responseJSON;
});

$.get('/getEmployee', {}, function(req, res, data){
    employeesAnnet = data.responseJSON;
});

function createPeopleDropdown(antSyk, antHjelp, antAnnet) {
    console.log("data hentet");
    console.log(this.employeesSyk);
    //alert(antSyk + " sykepleiere, " + antHjelp + " hjelpere, " + antAnnet + " annet");
    document.getElementById('peopleTable').innerHTML = "<tr><th  class='peopleTablecat'>Kategori</th><th class='peopleTableSel'>Ansatt</th></tr>";
    for(var i=0; i<antSyk; i++){
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Sykepleier</td><td class='peopleTableSel'><select id='syk" + i + "' class='peopleDropdown'></select></td></tr>";
        makeDropdownS("#syk"+i,this.employeesSyk);
    }
    for(var i=0; i<antHjelp; i++){
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Hjelpepleier</td><td class='peopleTableSel'><select id='hjelp" + i + "' class='peopleDropdown'></select></td></tr>";
        makeDropdownS("#hjelp" + i,employeesHelp);
    }
    for(var i=0; i<antAnnet; i++){
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Annet</td><td class='peopleTableSel'><select id='annet" + i + "' class='peopleDropdown'></select></td></tr>";
        makeDropdownS("#annet" + i,employeesAnnet);
    }
}

$.get('/getDepartment', {}, function(req, res, data){
    departments = data.responseJSON;
    makeDropdown('#chooseDepartment',departments)
});




function makeDropdownS(selector,list) {
    console.log("Prøver å lage dropdown");
    var columns = ["Navn"];
    console.log(list);
    for (var i = 0; i < list.length; i++) {
        var cellValue = list[i][columns[0]];
        if (cellValue == null) cellValue = "Ingen data fra DB";
        var option = $('<option />').text(cellValue);
        $(selector).append(option);
    }
}

function makeDropdown(selector,list) {
    var columns = addAllColumnHeaders(list, selector);
    for (var i = 0; i < list.length; i++) {
        var cellValue = list[i][columns[1]];
        if (cellValue == null) cellValue = "Ingen data fra DB";
        var option = $('<option />').text(cellValue);
        $(selector).append(option);
    }
}

function addAllColumnHeaders(list, selector) {
    var columnSet = [];
    var headerThead$ = $('<thead/>');
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < list.length; i++) {
        var rowHash = list[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerThead$);
    $(headerThead$).append(headerTr$);
    return columnSet;
}


$(function close() {
    $(".custom-close").on('click', function() {
        $('#adminNewShiftModal').modal('hide');
    });
});