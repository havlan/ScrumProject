/**
 * Created by torsku on 16.01.2017.
 */
var myList = [];
var typeNames =[];

$.get('/getEmployee', {}, function(req, res, data){

    $("#includedContent").load("menu");

    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#excelDataTable');
    //tableCreate();
});
//Build Table

function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);
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
//search for name(s)
function searchNameFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("excelDataTable");
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
    table = document.getElementById("excelDataTable");
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
// remove employee
function removeFunction() {
    var x;
    if (confirm("Er du sikker på at du vil fjerne denne ansatte?") == true) {
        //TODO
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
//myModal info
$(document).on('click','#excelDataTable tr',function(){
    //alert("heihei");
    $('#myModal').modal("show");
    $("#nameModal").val($(this).closest('tr').children()[0].textContent);
    $("#firstnamedb").val($(this).closest('tr').children()[0].textContent);
    $("#lastnamedb").val($(this).closest('tr').children()[0].textContent);
    $("#posdb").val($(this).closest('tr').children()[0].textContent);
    $("#phonedb").val($(this).closest('tr').children()[0].textContent);
    $("#email").val($(this).closest('tr').children()[0].textContent);
    $("#addressdb").val($(this).closest('tr').children()[0].textContent);
    $("#persnodb").val($(this).closest('tr').children()[0].textContent);
    $("#usernamedb").val($(this).closest('tr').children()[0].textContent);

});

$(function(){
    $('#addModal').on('submit', function(e){
        alert('hei');
        e.preventDefault();
        $.ajax({
            url: '/postUser', //this is the submit URL
            type: 'POST',
            data: {'name': $("#fornavn").val(),'address':$('#addresse').val(),'email':$('#epost').val(),'position':$('#stilling'),'pers_id':$('#personnummer'),'phonenummer':$('#telefonnummmer')},
            success: function(data){
                alert('successfully submitted')
            }
        });
    });
});
//myModal edit
$(function(){
    $('#editEmp').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: '/updateEmployee', //this is the submit URL
            type: 'POST',
            data: $('#editEmp').serialize(),
            success: function(data){
                alert('successfully submitted')
            }
        });
    });
});
//heiehi

$.get('/getTypeNames', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON[0]);

    typeNames = data.responseJSON;

    makeDropdown('#dropDownDest')
});

function makeDropdown(selector) {
    var option = $('<Option/>');
    for (var i = 0; i < typeNames.length; i++) {
        console.log("hallo");
    }
    $(selector).append(option);
}


