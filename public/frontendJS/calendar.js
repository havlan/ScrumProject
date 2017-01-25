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
        eventColor: '#7bc7ff', //default event color //can be set individually
        eventTextColor: '#000000', //default event text color
        height: 'auto',
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        eventSources: [
            {
                url: '/getPersonalShiftEvents', // use the `url` property
                color: 'green',    // an option!
                textColor: 'black'  // an option!
            },
            {
                url: '/getPossibleSiftsEvents', // use the `url` property
                color: 'yellow',    // an option!
                textColor: 'black'  // an option!
            }]
        ,
        eventClick: function(calEvent, jsEvent, view) {
            alert(event.title);
            // change the border color just for fun
            $(this).css('border-color', 'red');

        }
    });




    $.get('/getNextShiftForEmp', {}, function(req, res, data){
        document.getElementById("nextShiftInfo").innerHTML = "Din neste vakt: " +data.responseJSON[0].ndate + "\nSted: " + data.responseJSON[0].department_name;
    });


    function getA() {
        return "something";
    }
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
            data: {'shift_id': data[i], 'checked_by_admin': 0},
            success: function (data) {
                alert("success!");
                console.log(data.JSON.stringify());
            }
        });
    }
});



