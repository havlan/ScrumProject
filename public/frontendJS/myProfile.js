


$(document).ready(function(){ // syntax for å hente data når dokument (html) er lastet inn
    $("#sortTable").tablesorter();

    $.get('/getOneEmployee', {}, function(req, res, data){
        console.log(data);
        document.getElementById("navn").innerHTML               = data.responseJSON[0].name;
        document.getElementById("stillingsprosent").innerHTML   = data.responseJSON[0].seniority;
        document.getElementById("tlfnr").innerHTML              = data.responseJSON[0].phone_nr;
        document.getElementById("email").innerHTML              = data.responseJSON[0].email;
        document.getElementById("total_hours").innerHTML        = data.responseJSON[0].total_hours;
        document.getElementById("type_name").innerHTML          = data.responseJSON[0].type_name;
        document.getElementById("address").innerHTML            = data.responseJSON[0].address;


        document.getElementById("edittelefon").value = document.getElementById("tlfnr").innerHTML;
        document.getElementById("editadresse").value = document.getElementById("address").innerHTML;
        document.getElementById("editepost").value = document.getElementById("email").innerHTML;
    });
});

var myList= [];


$.get('/getEmployee_shifts_toCurrentDate', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#histTable');
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

$(function(){
    $('#editModal').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: '/updateEmployeePersonalInfo', //this is the submit URL
            type: 'POST',
            data: {'phone_nr': $("#edittelefon").val(),'address':$('#editadresse').val(),'email':$('#editepost').val()},
            success: function(data){
                console.log(data);
                document.getElementById("successMessage").innerHTML = "sendt";
                showSuccessMessage();
            },
            error: function(xhr){
                if(xhr.status==404){
                    document.getElementById("errorMessage").innerHTML = "ikke funnet";
                    showErrorMessage();
                } else {
                    document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                    showErrorMessage();
                }
            }
        });
    });
});

function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
function showErrorMessage() {
    var element = document.getElementById('errorMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}

function showWarningMessage() {
    var element = document.getElementById('warningMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}