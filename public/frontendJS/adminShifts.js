var departments = [];

var employeesSyk = [];
var employeesHelp = [];
var employeesAnnet = [];

var eventId;
var fillShiftList;
var currShiftId;
var disp = getDispersion(0);

var dropIds = [];
var date;
var place;



$(document).ready(function () {

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
        weekNumbers: true,
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
        eventClick: function (event, jsEvent, view) {
            getAvailableEmpForShift(event.id);
            $('#fillShiftModal').modal();
            eventId = event.id;
            currShiftId = event.id;
        }


    });

    var modal = document.getElementById('adminNewShiftModal');
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    };

    document.getElementById('datePicker').valueAsDate = new Date();

    createNumberDropdown();
});

/**
 * Fetches the employees available for the the selected shift.
 * @function
 * @param id
 */
function getAvailableEmpForShift(id) {
    $.ajax({
        url: '/getEmpForShiftDateAll', //this is the submit URL
        type: 'POST',
        data: {'shift_id': id},
        success: function (data) {
            fillShiftList = data;

            for (var i = 0; i < data.length; i++) {
                var option = $('<option />').text(data[i].name);
                $('#choosePerson').append(option);
            }

            //lag dropdown i modal
        },
        failure: function (err) {
            console.log("Error" + err);
        }
    });
}

/**
 * Saves the chosen employee for the chosen shift
 * @function
 */
function saveFillShift() {
    var emp_id = fillShiftList[$("#choosePerson").prop('selectedIndex')].employee_id;
    $.ajax({
        url: '/postShift_has_employee', //this is the submit URL
        type: 'POST',
        data: {'shift_id': currShiftId, 'employee_id': emp_id},
        success: function (data) {
            employeesSyk = data;
            location.reload();
        },
        failure: function (err) {
            console.log("Error" + err);
        }
    });
    $('#fillShiftModal').modal("hide");
}

/**
 * Creates select-amount-dropdown for the new-shift-modal.
 * @function
 */
function createNumberDropdown() {
    $('#chooseNumber').append($('<option />').text(0));
    for (var i = 4; i < 21; i++) {
        var option = $('<option />').text(i);
        $('#chooseNumber').append(option);
    }
}


/**
 * Finds the amount of each employeetype for a shift.
 * @function
 * @param res
 * @returns {{syk: *, hjelp: *, annet: number}}
 */
function getDispersion(res) {
    var ant = res;
    var syk;
    if (ant % 10 == 3 || (ant / 5) % 1 < 0.5) {
        syk = Math.floor(ant / 5);
    } else {
        syk = Math.round(ant / 5);
    }
    var hjelp;
    if (ant % 10 == 9 || (ant * 0.3) % 1 <= 0.5) {
        hjelp = Math.floor(ant * 0.3);
    } else {
        hjelp = Math.round(ant * 0.3);
    }
    var annet = Math.round(ant / 2);
    //getData(syk, hjelp, annet, createPeopleDropdown);
    return {
        "syk": syk,
        "hjelp": hjelp,
        "annet": annet
    };

}


$.get('/getDepartment', {}, function (req, res, data) {
    departments = data.responseJSON;
    makeDropdown('#chooseDepartment', departments);
});

/**
 * Updates the employee-table in the new-shift-modal.
 * @function
 */
function updateTable() {
    employeesSyk = [];
    employeesHelp = [];
    employeesAnnet = [];

    var quan = Number($("#chooseNumber option:selected").text());
    place = $("#chooseDepartment option:selected").text();
    var date2 = new Date($("#datePicker").val());

    var shift = document.querySelector('input[name="time"]:checked').value;

    if (shift == 'day') {
        date2.setHours(8);
    } else if (shift == 'evening') {
        date2.setHours(16)
    } else {
        date2.setHours(0);
        date2.setUTCDate(date2.getUTCDate() + 1);
    }

    date = date2.getFullYear() + "-" + (date2.getUTCMonth() + 1) + "-" + date2.getUTCDate() + " " + date2.getHours() + ":00:00";
    disp = getDispersion(quan);


    $.ajax({
        url: '/getAvailableEmpForDate', //this is the submit URL
        type: 'POST',
        data: {'date1': date, 'date2': date},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].type_name == 'Sykepleier') {
                    employeesSyk.push(data[i]);
                }

                if (data[i].type_name == 'Sykepleier' || data[i].type_name == 'Hjelpepleier') {
                    employeesHelp.push(data[i]);
                }

                employeesAnnet.push(data[i]);
            }

            createPeopleDropdown(disp.syk, disp.hjelp, disp.annet, employeesSyk, employeesHelp, employeesAnnet);
        },
        failure: function (err) {
            console.log("Error" + err);
        }
    });
}


/**
 * Creates the dropdowns in the employees-table in the new-shift-modal.
 * @function
 * @param antSyk
 * @param antHjelp
 * @param antAnnet
 * @param sykList
 * @param hjelpList
 * @param annetList
 */
function createPeopleDropdown(antSyk, antHjelp, antAnnet, sykList, hjelpList, annetList) {

    dropIds = [];

    document.getElementById('peopleTable').innerHTML = "<tr><th  class='peopleTablecat'>Kategori</th><th class='peopleTableSel'>Ansatt</th></tr>";
    for (var i = 0; i < antSyk; i++) {
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Sykepleier</td><td class='peopleTableSel'><select id='syk" + i + "' class='peopleDropdown'></select></td></tr>";
        makeDropdownS("#syk" + i, sykList);
        dropIds.push({"id": "#syk" + i, "cat": "0"});
    }
    for (var i = 0; i < antHjelp; i++) {
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Helsefagarbeider</td><td class='peopleTableSel'><select id='hjelp" + i + "' class='peopleDropdown'></select></td></tr>";
        makeDropdownS("#hjelp" + i, hjelpList);
        dropIds.push({"id": "#hjelp" + i, "cat": "1"});
    }
    for (var i = 0; i < antAnnet; i++) {
        document.getElementById('peopleTable').innerHTML += "<tr><td class='peopleTableCat'>Assistent</td><td class='peopleTableSel'><select id='annet" + i + "' class='peopleDropdown'></select></td></tr>";
        makeDropdownS("#annet" + i, annetList);
        dropIds.push({"id": "#annet" + i, "cat": "2"});
    }
}


/**
 * creates a dropdown.
 * @function
 * @param selector
 * @param list
 */
function makeDropdownS(selector, list) {
    $(selector).append($('<option />').text("Ingen valgt"));
    for (var i = 0; i < list.length; i++) {
        var cellValue = list[i].employee_id + ". " + list[i].name;
        if (cellValue == null) cellValue = "Ingen data fra DB";
        var option = $('<option />').text(cellValue);
        $(selector).append(option);
    }
}


/**
 * creates a dropdown.
 * @function
 * @param selector
 * @param list
 */
function makeDropdown(selector, list) {
    var columns = addAllColumnHeaders(list, selector);
    for (var i = 0; i < list.length; i++) {
        var cellValue = list[i][columns[1]];
        if (cellValue == null) cellValue = "Ingen data fra DB";
        var option = $('<option />').text(cellValue);
        $(selector).append(option);
    }
}

/**
 * Adds columnheaders.
 * @function
 * @param list
 * @param selector
 * @returns {Array}
 */
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

/**
 * Insert new shifts in the database, and binds them with an employee if chosen.
 * It cancels if an employee is chosen more than once.
 * @function
 */
function createNewShifts() {
    var sheToSend = [];
    var shiftToSend = [];

    for (var i = 0; i < dropIds.length; i++) {
        var index1 = $(dropIds[i].id).prop('selectedIndex');
        var valid = true;
        var emp1 = 0;

        if (index1 == 0) {

        } else {
            if (dropIds[i].cat == "0") {
                emp1 = employeesSyk[index1 - 1].employee_id;
            } else if (dropIds[i].cat == "1") {
                emp1 = employeesHelp[index1 - 1].employee_id;
            } else {
                emp1 = employeesAnnet[index1 - 1].employee_id;
            }
            for (var j = i + 1; j < dropIds.length; j++) {
                var index2 = $(dropIds[j].id).prop('selectedIndex');
                var emp2 = 0;


                if (index2 == 0) {

                } else {
                    if (dropIds[j].cat == "0") {
                        emp2 = employeesSyk[index2 - 1].employee_id;
                    } else if (dropIds[j].cat == "1") {
                        emp2 = employeesHelp[index2 - 1].employee_id;
                    } else {
                        emp2 = employeesAnnet[index2 - 1].employee_id;
                    }
                    if (emp1 == emp2) {
                        console.log("NOPE");
                        valid = false;
                        return;
                    }
                }
            }
        }
        var rank = "Assistent";
        if (dropIds[i].cat == "0") {
            rank = "Sykepleier";
        } else if (dropIds[i].cat == "1") {
            rank = "Helsefagarbeider";
        }

        var depId = departments[$('#chooseDepartment').prop('selectedIndex')].department_id;

        sheToSend.push({"employee_id":emp1});
        shiftToSend.push({"minutes":"480","date":date,"department_id":depId,"type_name":rank});
    }

    var shifts = [];
    var shiftemps = [];

    for (var u = 0; u < shiftToSend.length; u++) {
        shifts[u] = new Array(4);
        shifts[u][0] = shiftToSend[u].minutes;
        shifts[u][1] = shiftToSend[u].date;
        shifts[u][2] = shiftToSend[u].department_id;
        shifts[u][3] = shiftToSend[u].type_name;
    }

    for (var k = 0; k < sheToSend.length; k++) {
        shiftemps[k] = new Array(1);
        shiftemps[k][0] = sheToSend[k].employee_id;
    }

    if(valid){
        for(var t = 0; t < shiftToSend.length; t++) {
            $.ajax({
                url: '/postNewShiftsFromBulk', //this is the submit URL
                type: 'POST',
                data: {'minutes': shiftToSend[t].minutes, 'date': shiftToSend[t].date, 'department_id':shiftToSend[t].department_id, 'type_name':shiftToSend[t].type_name, 'emp':sheToSend[t].employee_id},
                success: function (data) {
                    if(t = shiftToSend.length-1){
                        location.reload();
                    }
                },
                failure: function (err) {
                    console.log("Error" + err);

                }
            })
        }
        $('#adminNewShiftModal').modal("hide");
    }

}


$(function close() {
    $(".custom-close").on('click', function () {
        $('#adminNewShiftModal').modal('hide');
    });
});