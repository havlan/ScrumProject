/**
 * Created by LittleGpNator on 18.01.2017.
 */

function leaveFunction(){
    document.getElementById('leaveApproval').style.display = "block";
    document.getElementById('switchApproval').style.display = "none";
    document.getElementById('overtimeApproval').style.display = "none";
    document.getElementById('save').style.display = "block";
}
function overtimeFunction(){
    document.getElementById('leaveApproval').style.display = "none";
    document.getElementById('switchApproval').style.display = "none";
    document.getElementById('overtimeApproval').style.display = "block";
    document.getElementById('save').style.display = "block";
}
function switchFunction(){
    document.getElementById('leaveApproval').style.display = "none";
    document.getElementById('switchApproval').style.display = "block";
    document.getElementById('overtimeApproval').style.display = "none";
    document.getElementById('save').style.display = "block";
}
var myList = [];
$.get('/getAbsenceView', {}, function(req, res, data){

    //$("#includedContent").load("menu");

    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#leaveTable');
    //tableCreate();
});
//Build Table

function buildHtmlTable(selector,list) {
    list = myList;
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr id=' + i + '/>');
        var check$ = $('<div class="checkbox"><label><input type="checkbox" id='+ i +' value=""></label></div>');
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
window.navn =""; //Name from selected row
window.shift = 0;//Shift ID from selected row
$(document).on('click','#leaveTable input',function () {
    navn = $(this).closest("tr").find('td:eq(2)').text();
    shift = $(this).closest("tr").find('td:eq(1)').text();
    alert(navn);
});

/*$(document).on('click','#leaveTable td',function(){
    navn = $(this).closest("tr").find('td:eq(0)').text();
    shift = $(this).closest("tr").find('td:eq(1)').text();
    $.get('/getAbsenceView', {}, function(req, res, data) {
        document.getElementById("navndb").innerHTML = (data.responseJSON[shift].Navn);
        document.getElementById("årsakdb").innerHTML = (data.responseJSON[shift].Årsak);
    });
    $('#approveModal').modal("show");
});*/