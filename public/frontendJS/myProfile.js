
$(document).ready(function(){ // syntax for å hente data når dokument (html) er lastet inn

    $("#sortTable").tablesorter();

    $.get('/getEmployee', {}, function(req, res, data){

        console.log(data);
        console.log(data.responseJSON[0]);

        document.getElementById("navn").innerHTML               = data.responseJSON[0].name;
        document.getElementById("stillingsprosent").innerHTML    = data.responseJSON[0].seniority;
        document.getElementById("tlfnr").innerHTML              = data.responseJSON[0].phone_nr;
        document.getElementById("email").innerHTML              = data.responseJSON[0].email;
        document.getElementById("adresse").innerHTML            = data.responseJSON[0].address;
    });
});


var myList= [];


$.get('/getVaktoversikt', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#histTable')
    //tableCreate();
});


function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);
    var tbody$ = $('<tbody/>');
    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
    $(selector).append(tbody$);
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
    $(selector).append(headerTr$);
    $(selector).append(headerThead$);

    return columnSet;
}