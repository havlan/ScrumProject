
var event_id;

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
                url: '/getPersonalShiftEvents',
                color: '#8cd9ad',
                textColor: 'black'
            },
            {
                url: '/getPossibleSiftsEvents',
                color: '#ffe066',
                textColor: 'black'
            },
            {
                url: '/getPersonalShiftsEventsDone',
                color: '#af2a91',
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
            } else{
                $('#modalShiftFree').html(event.title);
                $('#departmentFree').html("Avdeling: " + event.description);
                $('#beginFree').html("Starter: " + moment(event.start).format('MMM Do h:mm A'));
                $('#endFree').html("Slutter: " + moment(event.end || event.start).format('MMM Do h:mm A'));
                $('#fullCalModalFree').modal();
            }
        }
    });

    $.get('/getNextShiftForEmp', {}, function(req, res, data){
        document.getElementById("nextShiftInfo").innerHTML = "Dato: " +data.responseJSON[0].ndate + "<br><br>Sted: " + data.responseJSON[0].department_name;
    });

    $("#successMessageBox").hide();
    $("#testButton").click(function showAlert() { //TODO
        $("#successMessageBox").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    });

});

$.get('/getEmployee_Shifts_fromCurrentDate',{},function (req,res,data) {
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
    console.log(data);
     for (i = 0; i < data.length; i++) {
        console.log(data[i]);
        $.ajax({
            url: '/postRequest',
            type: 'POST',
            data: {'shift_id': data[i], 'checked_by_admin': 0,'explanation_request': ""},
            success: function (data) {
                alert("success!");
                console.log(data);
            }
        });
    }
});

$(document).on('click','#sendShiftRequest',function (e) {
    var textinput = $("#explanation").val;
    if(textinput.length<300){
        $.ajax({
            url: '/postRequest',
            type: 'POST',
            data: {'shift_id': event_id,'explanation_request': textinput, 'checked_by_admin': 0},
            success: function (data) {
                alert("success!");
                console.log(data);
            }
        });
    }else{
        alert("Grensen er 300 tegn!");
    }
});


$(document).on('click','#sendRequest',function () {
    console.log(event_id);
    if (event_id!=null){
        $.ajax({
            url: '/postRequestShift',
            type: 'POST',
            data: {'shift_id': event_id},
            success: function (data) {
                alert("success!");
                console.log(data);
            }
        });
    }else {
        console.log("an error occurred 2B|!2B");
    }
});

