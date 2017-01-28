
var departments     = [];

var employeesSyk = [];
var employeesHelp = [];
var employeesAnnet = [];

var eventId;
var fillShiftList;
var currShiftId;
var disp = getDispersion(0);



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
    var emp_id = fillShiftList[$("#choosePerson").prop('selectedIndex')].employee_id;
    $.ajax({
        url: '/postShift_has_employee', //this is the submit URL
        type: 'POST',
        data: {'shift_id': currShiftId,'employee_id': emp_id},
        success: function(data){
            employeesSyk = data;
            location.reload();
        },
        failure: function(err) {
            console.log("Error"+err);
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
    var ant = res;
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
    //getData(syk, hjelp, annet, createPeopleDropdown);
    return {
        "syk":syk,
        "hjelp":hjelp,
        "annet":annet
    };

}

function closeModal() {
    $("#adminNewShiftModal").modal('hide');
}

$.get('/getDepartment', {}, function(req, res, data){
    departments = data.responseJSON;
    makeDropdown('#chooseDepartment',departments);
});

function updateTable() {
    var employeesSyk = [];
    var employeesHelp = [];
    var employeesAnnet = [];

    var quan = Number($("#chooseNumber option:selected").text());
    var place = $("#chooseDepartment option:selected").text();
    var date2 = new Date($("#datePicker").val());

    var shift = document.querySelector('input[name="time"]:checked').value;

    if(shift == 'day'){
        date2.setHours(8);
    } else if (shift == 'evening'){
        date2.setHours(16)
    }else {
        date2.setHours(0);
        date2.setUTCDate(date2.getUTCDate()+1);
    }

    date = date2.getFullYear() + "-" + (date2.getUTCMonth()+1) + "-" + date2.getUTCDate() + " " + date2.getHours() + ":00:00";
    disp = getDispersion(quan);


    $.ajax({
        url: '/getAvailableEmpForDate', //this is the submit URL
        type: 'POST',
        data: {'date1': date, 'date2': date},
        success: function(data){
            for(var i = 0; i < data.length; i++){
                if(data[i].type_name == 'Sykepleier'){
                    employeesSyk.push(data[i]);
                }

                if(data[i].type_name == 'Sykepleier' || data[i].type_name == 'Hjelpepleier'){
                    employeesHelp.push(data[i]);
                }

                employeesAnnet.push(data[i]);
            }

            createPeopleDropdown(disp.syk, disp.hjelp, disp.annet, employeesSyk, employeesHelp, employeesAnnet);
        },
        failure: function(err) {
            console.log("Error"+err);
        }
    });
}

function createPeopleDropdown(antSyk, antHjelp, antAnnet, sykList, hjelpList, annetList) {
    document.getElementById('peopleTable').innerHTML = "<tr><th  class='peopleTablecat'>Kategori</th><th class='peopleTableSel'>Ansatt</th></tr>";
    for(var i=0; i<antSyk; i++){
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Sykepleier</td><td class='peopleTableSel'><select id='syk" + i + "' class='peopleDropdown' onchange='updateTheChosenOnes(this)'></select></td></tr>";
        makeDropdownS("#syk"+i,sykList);
    }
    for(var i=0; i<antHjelp; i++){
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Hjelpepleier</td><td class='peopleTableSel'><select id='hjelp" + i + "' class='peopleDropdown' onchange='updateTheChosenOnes(this)'></select></td></tr>";
        makeDropdownS("#hjelp" + i,hjelpList);
    }
    for(var i=0; i<antAnnet; i++){
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Annet</td><td class='peopleTableSel'><select id='annet" + i + "' class='peopleDropdown' onchange='updateTheChosenOnes(this)'></select></td></tr>";
        makeDropdownS("#annet" + i,annetList);
    }
}


function makeDropdownS(selector,list) {
    $(selector).append($('<option />').text("Ingen valgt"));
    for (var i = 0; i < list.length; i++) {
        var cellValue = list[i].name;
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

function updateTheChosenOnes(selector) {
    console.log(selector.id);
}


function createNewShifts() {
    //noen ifs
    //ajax post som tar inn arrayer



    console.log("Lager nye shifts");

}

$(function close() {
    $(".custom-close").on('click', function() {
        $('#adminNewShiftModal').modal('hide');
    });
});