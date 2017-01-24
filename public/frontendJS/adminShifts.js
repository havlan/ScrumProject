
$(document).ready(function() {
    $("#includedContent").load("menu");

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
        eventColor: '#000000', //default event color //can be set individually
        eventTextColor: '#ffffff', //default event text color
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        eventSources: [
            {
                url: '/getEvents', // use the `url` property
                color: '#55bb55',    // an option!
                textColor: 'black'  // an option!
            },
            {
                url: '/getEvents', // use the `url` property
                color: '#dd6655',    // an option!
                textColor: 'black'  // an option!
            }],
        eventClick: function(event) {
            document.getElementById('adminNewShiftModal').style.display = "block";
            return false;
        }
    });

    var modal = document.getElementById('adminNewShiftModal');
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    createNumberDropdown();
});




function createNumberDropdown(){
    for (var i = 5; i < 11; i++) {
        var option = $('<option />').text(i);
        $('#chooseNumber').append(option);
    }
}

function createPeopleDropdown(sel) {
    alert(sel.value);
    if(sel<7){

    } else if(sel==7) {

    } else if(sel<10) {

    } else {

    }
}


$.get('/getDepartment', {}, function(req, res, data){
    departments = data.responseJSON;
    makeDropdown('#chooseDepartment')
});

function makeDropdown(selector) {
    var columns = addAllColumnHeaders(departments, selector);
    for (var i = 0; i < departments.length; i++) {
        var cellValue0 = departments[i][columns[0]];
        var cellValue1 = departments[i][columns[1]];
        if (cellValue1 == null) cellValue1 = "Ingen data fra DB";
        var option = $('<option />').text(cellValue0 + "    " + cellValue1);
        $(selector).append(option);
    }
}

function addAllColumnHeaders(myList, selector) {

    var columnSet = [];
    var headerThead$ = $('<thead/>');
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerThead$);
    $(headerThead$).append(headerTr$);
    $("#cover").fadeOut(20);
    return columnSet;
}
