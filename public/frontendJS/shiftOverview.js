/**
 * Created by LittleGpNator on 13.01.2017.
 */

var department = [];
var today = new Date();

/**
 * Updates table
 * @function
 */
$(document).ready(function () {
    oppdateTable();
});
/**
 * Displays a dropdown with the department names from the database
 * @function
 */
$.get('/getDepartment', {}, function (req, res, data) {
    department = data.responseJSON;
    makeDropdown('#departmentInput', department);
});
/**
 * Makes a dropdown
 * @function
 * @param selector
 * @param list
 */
function makeDropdown(selector, list) {
    var columns = addAllColumnHeaders(list, selector);
    for (var i = 0; i < list.length; i++) {
        var cellValue0 = list[i][columns[1]];
        if (cellValue0 == null) cellValue0 = "Ingen data fra DB";
        var option = $('<option />').text(cellValue0);
        $(selector).append(option);
    }
}

/**
 * Updates the table with the information about the three shift types
 * on a date on a chosen place
 * @function
 */
function oppdateTable() {
    $(".table").empty();

    $.ajax({
        url: '/getVaktliste2', //this is the submit URL
        type: 'POST',
        data: {
            'department_name': $("#departmentInput").find(":selected").text(),
            'date': document.getElementById("datePicker").value
        },
        success: function (req, res, data) {
            buildHtmlTable('#dayTable', data.responseJSON);
            document.getElementById("successMessage").innerHTML = "Success!";
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
        },
        failure: function (err) {
            console.log("Error" + err);
        }
    });

    $.ajax({
        url: '/getVaktliste3', //this is the submit URL
        type: 'POST',
        data: {
            'department_name': $("#departmentInput").find(":selected").text(),
            'date': document.getElementById("datePicker").value
        },
        success: function (req, res, data) {
            buildHtmlTable('#evningTable', data.responseJSON);
            document.getElementById("successMessage").innerHTML = "Success!";
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
        },
        failure: function (err) {
            console.log("Error" + err);
        }
    });
    $.ajax({
        url: '/getVaktliste1', //this is the submit URL
        type: 'POST',
        data: {
            'department_name': $("#departmentInput").find(":selected").text(),
            'date': document.getElementById("datePicker").value
        },
        success: function (req, res, data) {
            buildHtmlTable('#nightTable', data.responseJSON);
            document.getElementById("successMessage").innerHTML = "Success!";
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
        },
        failure: function (err) {
            console.log("Error" + err);
        }
    });
};

/**
 * Builds a HTML table with data from the database
 * @function
 * @param selector
 * @param list
 * @param index2
 */
function buildHtmlTable(selector, list, index2) {
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody ' + "id= tbodyid" + '/>');
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

/**
 * Adds all column headers
 * @function
 * @param list
 * @param selector
 * @returns {Array}
 */
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

/**
 * Displays a success message
 * @function
 */
function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
/**
 * Displays an error message
 * @function
 */
function showErrorMessage() {
    var element = document.getElementById('errorMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
/**
 * Displays a warning message
 * @function
 */
function showWarningMessage() {
    var element = document.getElementById('warningMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}