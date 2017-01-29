var noe =[];
var i = 0;
var myList = [];
window.ansattid = 0;
window.nyansattid = 0;
window.shift_id = 0;
window.indeks = 0;
function leaveFunction(){
    document.getElementById('leaveApproval').style.display = "block";
    document.getElementById('switchApproval').style.display = "none";
    document.getElementById('overtimeApproval').style.display = "none";
    document.getElementById('Lagre').style.display = "block";

}
function overtimeFunction(){
    document.getElementById('leaveApproval').style.display = "none";
    document.getElementById('switchApproval').style.display = "none";
    document.getElementById('overtimeApproval').style.display = "block";
    document.getElementById('Lagre').style.display = "block";

}
function switchFunction(){
    document.getElementById('leaveApproval').style.display = "none";
    document.getElementById('switchApproval').style.display = "block";
    document.getElementById('overtimeApproval').style.display = "none";
    document.getElementById('Lagre').style.display = "none";

}

/**
 * Fills leaveTable with data from Absence
 * @function
 */
$.get('/getAbsenceView', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    buildHtmlTable('#leaveTable',myList);
});
/**
 * Fills overtimeTable with data from Overtime
 * @function
 */
$.get('/getOvertimeView',{},function (req,res,data) {
    myList = data.responseJSON;
    buildHtmlTable('#overtimeTable',myList);
});
/**
 * Fills switchTable with data from Request
 * @function
 */
$.get('/getRequestView',{},function (req,res,data) {
    myList = data.responseJSON;
    buildHtmlTable('#switchTable',myList);
});

/**
 * Builds a table given JSON data and an ID in HTML file
 * @function
 * @params {text} selector - id of table in HTML file you want to build,{JSONArray} list - an array with data to fill the table.
 */
function buildHtmlTable(selector,list) {
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr id=' + i + '/>');
        var check$ = $('<div class="checkbox radio-margin"><label><input type="checkbox" class="openModal" id='+ i +' value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = list[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        row$.append($('<td/>').html(check$));
        $(selector).append(row$);
        $(tbody).append(row$);
    }
    $(selector).append(tbody);
}
/**
 * Adds columnheaders to table
 * @function
 * @param {text} selector - id of table in HTML file you want to build,{JSONArray} list - an array with data to fill the table.
 */
function addAllColumnHeaders(list, selector) {
    var columnSet = [];
    var headerThead$ = $('<thead/>');
    var headerTr$ = $('<tr/>');
    for (var i = 0; i < list.length+1; i++) {
        var rowHash = list[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }

    }
    headerTr$.append($('<th/>'));
    $(selector).append(headerThead$);
    $(headerThead$).append(headerTr$);
    return columnSet;
}
/**
 * Builds a table given JSON data and an ID in HTML file, slightly different form buildHtmlTable(different class input type)
 * @function
 * @param {text} selector - id of table in HTML file you want to build,{JSONArray} list - an array with data to fill the table.
 */
function buildHtmlTable2(selector,list) {
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr id=' + i + '/>');
        var check$ = $('<div class="checkbox radio-margin"><label><input type="checkbox" class="openModal2" id='+ i +' value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = list[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        row$.append($('<td/>').html(check$));
        $(selector).append(row$);
        $(tbody).append(row$);
    }
    $(selector).append(tbody);
}
/**
 * Opens modal when pressing table row in switchTable, finds id from selected row
 * If checkbox on select row is checked, approveModal will show with a table 'ansattTable'
 * And will fill this table with data
 * Closes modal on click
 * @function
 */
$(document).on('click','#switchTable .openModal',function () {
    indeks = $(this).closest("tr").find('td:eq(0)').text();
    //if checkbox is checked
    if ($(this).is(':checked')) {
        ansattid = $(this).closest("tr").find('td:eq(1)').text();
        document.getElementById("skiftdb").innerHTML = "Skift: "+indeks;
        $.get('/getRequestShift/'+parseInt(indeks),function(req,res,data1){
            $('#hei').append('<table class="table table-striped table-bordered" id="ansattTable"></table>');
            buildHtmlTable2("#ansattTable",data1.responseJSON);
            console.log(data1.responseJSON);
        });
        $('#approveModal').modal('show');
        //if checkbox is unchecked
    } else {
        $('#approveModal').modal('hide');
    }
    //on modal close
    $('#closeModal').on('click',function () {
        $('input[class=openModal]').prop('checked', false);
        $('#ansattTable').remove();
    });
    //when one checkbox is checked the remaining are left unchecked
       $('input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
    });
});
/**
 * Selects employee_id from checked row in ansattTable in modal
 * Unchecks all other rows
 * @function
 */
$(document).on('click','#ansattTable .openModal2',function (e) {
    if ($(this).is(':checked')) {
        $('input[class="openModal2"]').not(this).prop('checked', false);
        nyansattid = $(this).closest("tr").find('td:eq(0)').text();
    }
});
/**
 * Generates arrays with id's from checked rows in leaveTable and overtimeTable
 * Updates Absence and Overtime in database
 * @function
 */
//When pressing 'Lagre'-button any row that is checked will get checked_by_admin=1
$(document).on('click','#Lagre',function (e) {
    e.preventDefault();
    var absenceIDArray = $("#leaveTable").find("input:checkbox:checked").map(function(){
        return $(this).closest("tr").find('td:eq(0)').text();
    }).toArray(); // <----
    var skiftIDArray = $("#leaveTable").find("input:checkbox:checked").map(function(){
        return $(this).closest("tr").find('td:eq(3)').text();
    }).toArray(); // <----
    var employeeIDArray = $("#leaveTable").find("input:checkbox:checked").map(function(){
        return $(this).closest("tr").find('td:eq(1)').text();
    }).toArray(); // <----
    var overtimeIDArray = $("#overtimeTable").find("input:checkbox:checked").map(function(){
        return $(this).closest("tr").find('td:eq(0)').text();
    }).toArray(); // <----
  //  console.log(data);
    for(i=0; i<skiftIDArray.length; i++){
        //alert("success!");
        updateAbsence(absenceIDArray[i]);
    }
    for(i=0; i<overtimeIDArray.length; i++){
        updateOvertime(overtimeIDArray[i]);
    }
});
/**
 * Removes an employee from Shift_has_employee in database
 * @function
 * @params {number} skiftid - id of shift,{number} ansatt - id of employee
 */
function fjernAnsatt(skiftid,ansatt){
    var id;
    if(skiftid==null) {//if method is called from 'Godkjenn vaktbytte'
        id = indeks;
    } else id = skiftid;//If method is called from 'Godkjenn fravær'
    $.ajax({
        url:'/deleteShift_has_employee',
        type: 'DELETE',
        data:{'shift_id':id,'employee_id':ansatt},
        success:function (data) {
            document.getElementById("successMessage").innerHTML = "Ansatt er fjernet";
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
}
/**
 * Replaces an employee in shift_has_employee with another
 * @function
 * @params {number} skiftid - id of shift,{number} nyansattid - id of employee to replace, {number} - id of employee to be replaced
 */
function erstattAnsatt() {
    var skiftid = indeks;
    console.log(ansattid);
    console.log(nyansattid);
    console.log(skiftid);
    $.ajax({
        url: '/updateShift_has_employee',
        type:'POST',
        data:{'employee_id':ansattid,'shift_id':skiftid,'employee_id2':nyansattid},
        success:function (data) {
            fjernAnsatteRequestShift(skiftid);
            document.getElementById("successMessage").innerHTML = "Ansatt er erstattet";
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
}
/**
 * Removes all employees connected to a specific shift in Request_shift
 * @function
 * @params {number} skiftid - id of shift
 */
function fjernAnsatteRequestShift(skiftid){
    $.ajax({
        url:'/deleteRequest_shift',
        type:'DELETE',
        data:{'shift_id':skiftid},
        success:function (data) {
           deleteRequest(indeks);
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
}
/**
 * Removes a specific request from Request
 * @function
 * @params {number} request_id - id of request
 */
function deleteRequest(id) {
    $.ajax({
        url: '/deleteRequest',
        type:'DELETE',
        data:{'request_id':id},
        success:function (data) {
            //alert("Request slettet.");
        },
        error: function(xhr) {
            if (xhr.status == 404) {
                document.getElementById("errorMessage").innerHTML = "ikke funnet";
                showErrorMessage();
            } else {
                document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                showErrorMessage();
            }
        }
    });
}
/**
 * Sets a request in Absence to checked_by_admin
 * @function
 * @params {number} id - id of absence
 */
function updateAbsence(id) {
    $.ajax({
        url: '/updateAbsence2',
        type:'POST',
        data:{'absence_id':id,'checked_by_admin':1},
        success:function (data) {
            alert("Absence slettet.");
            document.getElementById("successMessage").innerHTML = "fravær er fjernet";
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
}
/**
 * Sets a request in Overtime to checked_by_admin
 * @function
 * @params {number} id - id of overtime
 */
function updateOvertime(id) {
    $.ajax({
        url: '/updateOvertime2',
        type:'POST',
        data:{'overtime_id':id,'checked_by_admin':1},
        success:function (data) {
            document.getElementById("successMessage").innerHTML = "Overtid er oppdatert";
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
}
/**
 * Shows a success-message
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
 * Shows an error-message
 * @function
 */
function showErrorMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    },3000);
}