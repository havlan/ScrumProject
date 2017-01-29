
var event_id;

$(document).ready(function() {

    //Fullcalendar
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
                url: '/getPersonalShiftEventsDone',
                color: '#c4e6ff',
                textColor: 'black'
            },
            {
                url: '/getPersonalShiftEvents',
                color: '#8cd9ad',
                textColor: 'black'
            },{
                url: '/getPossibleShiftsEvents',
                color: '#ffe066',
                textColor: 'black'
            }]
        ,
        eventClick:  function(event, jsEvent, view) {
            event_id = event.id;

            if(event.phone_nr) {
                $('#modalShift').html(event.title);
                $('#department').html("Avdeling: " + event.description);
                $('#begin').html("Starter: " + moment(event.start).format('MMM Do h:mm A'));
                $('#end').html("Slutter: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModal').modal();
            }

            else if(event.email){
                $('#modalShiftDone').html(event.title);
                $('#departmentDone').html("Avdeling: " + event.description);
                $('#beginDone').html("Startet: " + moment(event.start).format('MMM Do h:mm A'));
                $('#endDone').html("Sluttet: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModalDone').modal();
            }

            else{
                $('#modalShiftFree').html(event.title);
                $('#departmentFree').html("Avdeling: " + event.description);
                $('#beginFree').html("Starter: " + moment(event.start).format('MMM Do h:mm A'));
                $('#endFree').html("Slutter: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModalFree').modal();

            }
        }
    });

    $.get('/getNextShiftForEmp', {}, function(req, res, data){
        document.getElementById("nextShiftInfo").innerHTML = "Dato: " +data.responseJSON[0].ndate + "<br>Sted: " + data.responseJSON[0].department_name;
    });

});

$.get('/getEmployee_Shifts_fromCurrentDate2',{},function (req,res,data) {
    myList = data.responseJSON;
    buildHtmlTable('#vaktTable');
});

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
//When pressing 'Lagre'-button any row that is checked will get checked_by_admin=1
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
                document.getElementById("successMessage").innerHTML = "Success!";
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

$(document).on('click','#freeSave',function (e) {
    var textinput = $("#expField").val();
    if(textinput.length<300){
        $.ajax({
            url: '/postRequest',
            type: 'POST',
            data: {'shift_id': event_id,'explanation_request': textinput, 'checked_by_admin': 0},
            success: function (data) {
                document.getElementById("successMessage").innerHTML = "Success!";
                showSuccessMessage();
                $('#fullCalModal').modal('hide');
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


$(document).on('click','#sendRequest',function () {
    if (event_id!=null){
        $.ajax({
            url: '/postRequestShift',
            type: 'POST',
            data: {'shift_id': event_id},
            success: function (data) {
                document.getElementById("successMessage").innerHTML = "Success!";
                showSuccessMessage();
            },
            error: function(xhr){
                if(xhr.status==404){
                    document.getElementById("errorMessage").innerHTML = "ikke funnet";
                    showErrorMessage();
                } else if (xhr.status==409) {
                    document.getElementById("warningMessage").innerHTML = "Du har alt sendt forespørsel";
                    showWarningMessage();
                }else {
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
                    alert("success!");
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


function showExplanationField(){
    document.getElementById('spaceFree').style.visibility = "visible";
    document.getElementById('spaceOver').style.visibility="hidden";
}
function showOverField(){
    document.getElementById('spaceFree').style.visibility = "hidden";
    document.getElementById('spaceOver').style.visibility="visible";
}

function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
function showErrorMessage() {
    var element = document.getElementById('errorMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
function showWarningMessage() {
    var element = document.getElementById('warningMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}