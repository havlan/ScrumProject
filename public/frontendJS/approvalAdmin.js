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
window.indeks = 0;
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
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
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
    return columnSet;
}