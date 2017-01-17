/**
 * Created by torsku on 16.01.2017.
 */
var myList = [];
$(document).ready(function getInfo(){
    $.get("/getEmployee",{},function (req, res,data) {
        $("#includedContent").load("menu");
        document.getElementById("firstnamedb").innerHTML = data.responseJSON[0].name;
        document.getElementById("lastnamedb").innerHTML = data.responseJSON[0].name;
        document.getElementById("posdb").innerHTML = data.responseJSON[0].type_name;
        document.getElementById("phonedb").innerHTML = data.responseJSON[0].phone_nr;
        document.getElementById("emaildb").innerHTML = data.responseJSON[0].email;
        document.getElementById("addressdb").innerHTML = data.responseJSON[0].address;
        //  document.getElementById("persnodb").innerHTML = data.responesJSON[0].pers_id;
    });
    /*    $.get("/getLogInInfo",{},function (req, res, data) {
     document.getElementById("usernamedb").innerHTML = data.responseJSON[0].username;
     })*/
});

$.get('/getEmployee', {}, function(req, res, data){
    console.log(data);
 //   console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;
    buildHtmlTable('#excelDataTable');
    //tableCreate();
});
function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
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
    $(selector).append(headerTr$);
    $(selector).append(headerThead$);

    return columnSet;
}
//search for name(s)
function searchNameFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("excelDataTable");
    tr = table.getElementsByTagName("tr");

    //Hide the rows that dont match the search
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[7];
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
    table = document.getElementById("excelDataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[6];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
// remove employee
function removeFunction() {
    var x;
    if (confirm("Er du sikker på at du vil fjerne denne ansatte?") == true) {
        //FJERN ANSATT FRA DATABASE
    }
}
function hideForm() {
    document.getElementById('personForm').style.display = "none";
    document.getElementById("personInfo").style.display = "block";
    document.getElementById("edit").style.display = "inline";
    document.getElementById("remove").style.display = "inline";
    document.getElementById("back").style.display = "none";
}

function hideInfo() {
    document.getElementById("personInfo").style.display = "none";
    document.getElementById("personForm").style.display = "block";
    document.getElementById("remove").style.display = "none";
    document.getElementById("edit").style.display="none";
    document.getElementById("back").style.display="inline";
    document.getElementById("back").style.display="inline";
}

function saveFunction() {
    var x;
    if (confirm("Er du sikker på at du vil lagre?") == true) {
        //OPPDATER INFO I DATABASEN
    }
}

$('table tbody tr  td').on('click',function(){
    $("#myModal").modal("show");
    $("#nameModal").val($(this).closest('tr').children()[0].textContent);
    $("#positionModal").val($(this).closest('tr').children()[1].textContent);
});


