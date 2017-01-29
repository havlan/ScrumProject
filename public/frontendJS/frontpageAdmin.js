/**
 * Dislays the number of shifts that need to be filled
 * @function
 */
$.get('/getAvailableShifts', {}, function(req, res, data){
    document.getElementById("freeShiftsNumber").innerHTML = data.responseJSON[0].total;
});

/**
 * Displays the number of leave/absence to be approved
 * @function
 */
$.get('/getAbsenceNum', {}, function(req, res, data){
    document.getElementById("absenceWarning").innerHTML = data.responseJSON[0].total + " fravær til godkjenning";
});

/**
 * Displays the number of overtime request to be approved
 * @function
 */
$.get('/getOvertimeNum', {}, function(req, res, data){
    document.getElementById("overtimeWarning").innerHTML = data.responseJSON[0].total + " overtid til godkjenning";
});

/**
 *Displays the number of shift changes to be approved
 * @function
 */
$.get('/getChangeNum', {}, function(req, res, data){
    document.getElementById("changeWarning").innerHTML = data.responseJSON[0].total + " bytteforespørsel";
});


var event_id;
/**
 * Displays the calendar (Fullcalendar)
 * @function
 */
$(document).ready(function() {

    $('#calendar').fullCalendar({
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
        timezone : 'local',
        weekNumbers:true,
        navLinks: false,
        editable: false,
        eventColor: '#7bc7ff',
        eventTextColor: '#000000',
        height: 'auto',
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        eventSources: [
            {
                url: '/getPossibleShiftsEvents',
                color: '#ffe066',
                textColor: 'black'
            },
            {
                url: '/getPersonalShiftEvents',
                color: '#8cd9ad',
                textColor: 'black'
            },
            {
                url: '/getPersonalShiftEventsDone',
                color: '#c4e6ff',
                textColor: 'black'
            }]
        ,
        eventClick:  function(event, jsEvent, view) {
            event_id = event.id;
            //if the shift is green it is approved by the employee, adds correct modal
            if(event.phone_nr) {
                $('#modalShift').html(event.title);
                $('#department').html("Avdeling: " + event.description);
                $('#begin').html("Starter: " + moment(event.start).format('MMM Do h:mm A'));
                $('#end').html("Slutter: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModal').modal();
            }
            //if the shift is blue it has already passed, adds correct modal
            else if(event.email){
                $('#modalShiftDone').html(event.title);
                $('#departmentDone').html("Avdeling: " + event.description);
                $('#beginDone').html("Startet: " + moment(event.start).format('MMM Do h:mm A'));
                $('#endDone').html("Sluttet: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModalDone').modal();
            }
            //if the shift is yellow it is an available shift for the employee, adds correct modal
            else{
                $('#modalShiftFree').html(event.title);
                $('#departmentFree').html("Avdeling: " + event.description);
                $('#beginFree').html("Starter: " + moment(event.start).format('MMM Do h:mm A'));
                $('#endFree').html("Slutter: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModalFree').modal();

            }
        }
    });

});

/**
 * Gets an employee's shifts from a current date
 * @functin
 */
$.get('/getEmployee_Shifts_fromCurrentDate2',{},function (req,res,data) {
    myList = data.responseJSON;
    buildHtmlTable('#vaktTable');
});
/**
 * Builds the table with data from the database
 * @param selector
 * @param list
 */
function buildHtmlTable(selector,list) {
    list = myList;
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr id=' + i + '/>');
        var check$ = $('<div class="checkbox radio-margin"><label><input type="checkbox" id='+ i +' value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        row$.append($('<td/>').html(check$));
        // $(row$).setAttribute('id',"surprise maddafakka");
        $(selector).append(row$);
        $(tbody).append(row$);
    }
    $(selector).append(tbody);
}
/**
 * Adds column headers to the table
 * @param myList
 * @param selector
 * @returns {Array}
 */
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerThead$ = $('<thead/>');
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < myList.length+1; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }

    }
    headerTr$.append($('<th/>'));
    $(selector).append(headerThead$);
    $(headerThead$).append(headerTr$);
    return columnSet;
}
/**
 * When pressing 'Lagre'-button any row that is checked will get checked_by_admin=1
 * @function
 */
$(document).on('click','#sendForespørsel',function (e) {
    e.preventDefault();
    var data = $("#vaktTable").find("input:checkbox:checked").map(function () {
        return $(this).closest("tr").find('td:eq(3)').text();
    }).toArray(); // <----
    for (i = 0; i < data.length; i++) {
        $.ajax({
            url: '/postRequest',
            type: 'POST',
            data: {'shift_id': data[i], 'checked_by_admin': 0,'explanation_request': ""},
            success: function (data) {
                document.getElementById("successMessage").innerHTML = "Suksess";
                showSuccessMessage();
            },
            error: function(xhr){
                if(xhr.status==404){
                    document.getElementById("errorMessage").innerHTML = "ikke funnet";
                    showErrorMessage();
                } else {
                    document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                    showErrorMessage();
                }
            }
        });
    }
});

/**
 * Sends request to change shift
 * @function
 */
$(document).on('click','#freeSave',function (e) {
    var textinput = $("#expField").val();
    if(textinput.length<300){
        $.ajax({
            url: '/postRequest',
            type: 'POST',
            data: {'shift_id': event_id,'explanation_request': textinput, 'checked_by_admin': 0},
            success: function (data) {
                document.getElementById("successMessage").innerHTML = "Forespørsel om å bytte vakt sendt";
                showSuccessMessage();
            },
            error: function(xhr){
                if(xhr.status==404){
                    document.getElementById("errorMessage").innerHTML = "ikke funnet";
                    showErrorMessage();
                } else {
                    document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                    showErrorMessage();
                }
            }
        });
    }else{
        alert("Grensen er 300 tegn!");
    }
});

/**
 * Sends request to take available shift
 * @function
 */
$(document).on('click','#sendRequest',function () {
    if (event_id!=null){
        $.ajax({
            url: '/postRequestShift',
            type: 'POST',
            data: {'shift_id': event_id},
            success: function (data) {
                document.getElementById("successMessage").innerHTML = "Forespørsel om å ta vakt sendt";
                showSuccessMessage();
            },
            error: function(xhr){
                if(xhr.status==404){
                    document.getElementById("errorMessage").innerHTML = "ikke funnet";
                    showErrorMessage();
                } else {
                    document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                    showErrorMessage();
                }
            }
        });
    }else {
        document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
        showErrorMessage();
    }
});

/**
 * Sends overtime request
 * @function
 */
$(document).on('click','#overSave',function () {

    var numberinput = $("#overTime").val();
    var explenation = $("#overField").val();

    if (event_id!=null){
        if (numberinput){
            $.ajax({
                url: '/postOvertime',
                type: 'POST',
                data: {'shift_id': event_id,
                    'overtime': numberinput,
                    'explanation': explenation},
                success: function (data) {
                    document.getElementById("successMessage").innerHTML = "Forespørsel om overtid sendt";
                    showSuccessMessage();
                },
                error: function(xhr){
                    if(xhr.status==404){
                        document.getElementById("errorMessage").innerHTML = "ikke funnet";
                        showErrorMessage();
                    } else {
                        document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                        showErrorMessage();
                    }
                }
            });
        }
    }
});

/**
 *  Displays the "free-field" in the "green" modal
 *  @function
 */
function showExplanationField(){
    document.getElementById('spaceFree').style.visibility = "visible";
    document.getElementById('spaceOver').style.visibility="hidden";
}
/**
 * Displays the "overtime-field" in the "green" modal
 * @function
 */
function showOverField(){
    document.getElementById('spaceFree').style.visibility = "hidden";
    document.getElementById('spaceOver').style.visibility="visible";
}

/**
 * Displays a success message
 * @function
 */
function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
/**
 * Displays an error message
 * @function
 */
function showErrorMessage() {
    var element = document.getElementById('errorMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
/**
 * Displays a warning message
 * @function
 */
function showWarningMessage() {
    var element = document.getElementById('warningMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}