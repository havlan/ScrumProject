/**
 * Created by rebekkaheggebo on 20.01.2017.
 */
var myList = [];

$.get('/getEmployee', {}, function(req, res, data){

    $("#includedContent").load("menu");

    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#dbDataTable');
    //tableCreate();
});
//Build Table
function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr data-toggle="modal" data-target="#infoModal"/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
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
//search for name(s)
function searchNameFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dbDataTable");
    tr = table.getElementsByTagName("tr");

    //Hide the rows that dont match the search
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
//search for position
function searchPositionFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("positionInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dbDataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
$.get('/getEmployee', {}, function(req, res, data){

    console.log(data);
    console.log(data.responseJSON[0]);

    document.getElementById("nameEmp").innerHTML = data.responseJSON[0].name;
    document.getElementById("tlfnrInfo").innerHTML = data.responseJSON[0].phone_nr;
    document.getElementById("emailInfo").innerHTML = data.responseJSON[0].email;
    document.getElementById("adresseInfo").innerHTML = data.responseJSON[0].address;

    $("#cover").fadeOut(10); <!-- MÅ ligge etter det som tar legst å loade-->
});