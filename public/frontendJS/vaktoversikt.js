/**
 * Created by LittleGpNator on 13.01.2017.
 */

var department= [];
var today = new Date();

function currentDay(today1) {
    var dd = today1.getDate();
    var mm = today1.getMonth()+1; //January is 0!

    var yyyy = today1.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    today1 = yyyy+'-'+mm+'-'+dd;
    console.log(today1);
    return today1;
}

$(document).ready(function(){
    $("#datepicker").val(currentDay());
    oppdateTable();
});

$.get('/getDepartment', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON);
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


function oppdateTable(){
    $(".table").empty();
    $.ajax({
        url: '/getVaktliste2', //this is the submit URL
        type: 'POST',
        data: {'department_name': $("#departmentInput").find(":selected").text(),
            'date': document.getElementById("datePicker").value},
        success: function(req,res,data){
            console.log('successfully submitted');

            console.log(data);
            buildHtmlTable('#dayTable',data.responseJSON);
        },
        failure: function(err) {console.log("Error"+err);}
    });

    $.ajax({
        url: '/getVaktliste3', //this is the submit URL
        type: 'POST',
        data: {'department_name': $("#departmentInput").find(":selected").text(),
            'date': document.getElementById("datePicker").value},
        success: function(req,res,data){
            console.log('successfully submitted');

            console.log(data);
            buildHtmlTable('#evningTable',data.responseJSON);
        },
        failure: function(err) {console.log("Error"+err);}
    });
    $.ajax({
        url: '/getVaktliste1', //this is the submit URL
        type: 'POST',
        data: {'department_name': $("#departmentInput").find(":selected").text(),
                          'date': document.getElementById("datePicker").value},
        success: function(req,res,data){
            console.log('successfully submitted');

            console.log(data);
            buildHtmlTable('#nightTable',data.responseJSON);
        },
        failure: function(err) {console.log("Error"+err);}
    });
};



function buildHtmlTable(selector,list, index2) {
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody '+ "id= tbodyid"+'/>');
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
    return columnSet;
}


function addAllColumnHeaders2(list, selector) {
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
        index++;
    };