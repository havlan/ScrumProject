/**
 * Created by LittleGpNator on 13.01.2017.
 */

var myList1= [];
var myList2= [];
var myList3= [];
var department= [];
var dropdownInput = $("#departmentInput").find(":selected").text();


$.get('/getDepartment', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON);
    console.log($("#departmentInput").val());
    department = data.responseJSON;

    makeDropdown('#departmentInput',department);
});

function makeDropdown(selector,list) {
    var columns = addAllColumnHeaders(list, selector);
    for (var i = 0; i < list.length; i++) {
        var cellValue0 = list[i][columns[1]];
        if (cellValue0 == null) cellValue0 = "Ingen data fra DB";
        var option = $('<option />').text(cellValue0);
        $(selector).append(option);
    }
}



function myFunction(){
    $('#departmentInput').change(function(){
        $.ajax({
            url: '/postVaktliste1', //this is the submit URL
            type: 'POST',
            data: {'department_id': dropdownInput},
            success: function(data){
                console.log('successfully submitted');
                myList1 = data.responseJSON;
                buildHtmlTable('#dayTable',myList1);
            }
        });
    });
};





function buildHtmlTable(selector,list) {
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = list[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(tbody).append(row$);

    }
    $(selector).append(tbody);
}
function addAllColumnHeaders(list, selector) {

    var columnSet = [];
    var headerThead$ = $('<thead/>');
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < list.length; i++) {
        var rowHash = list[i];
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
