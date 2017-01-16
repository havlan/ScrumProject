/**
 * Created by LittleGpNator on 13.01.2017.
 */

$( document ).ready(function() {
    $("#includedContent").load("troll");
});


var myList= [];


$.get('/PersonalInfo', {}, function(req, res, data){
    console.log(data);

    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#excelDataTable')


});


function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}


function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<thead><tr/>');

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

    return columnSet;
};