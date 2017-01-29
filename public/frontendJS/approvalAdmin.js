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
$(document).ready(function () {
    getAbsenceTable();
    getOvertimeTable();
    getSwitchTable();
});

//Gets data for tables
function getAbsenceTable() {
    $.get('/getAbsenceView', {}, function(req, res, data){
        $('#leaveTable').empty();
        console.log(data);
        console.log(data.responseJSON[0]);
        myList = data.responseJSON;
        buildHtmlTable('#leaveTable',myList);
        $('#leaveTable').tablesorter();
    });
}

function getOvertimeTable() {
    $.get('/getOvertimeView',{},function (req,res,data) {
        $('#overtimeTable').empty();
        myList = data.responseJSON;
        buildHtmlTable('#overtimeTable',myList);
        $('#overtimeTable').tablesorter();
    });
}
function getSwitchTable() {
    $.get('/getRequestView',{},function (req,res,data) {
        $('#switchTable').empty();
        myList = data.responseJSON;
        buildHtmlTable('#switchTable',myList);
        $('#switchTable').tablesorter();
    });
}


//Builds a table in HTML document for a specific table id from a list
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
//Different checkbox class, should only be able to select one at a time
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
//when you press a checkbox in switchtable
$(document).on('click','#switchTable .openModal',function (e) {
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
    $('#approveModal').on('hidden.bs.modal',function () {
        $('input[class=openModal]').prop('checked', false);
        $('#ansattTable').remove();
    });
    //when one checkbox is checked the remaining are left unchecked
       $('input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
    });
});

$(document).on('click','#ansattTable .openModal2',function (e) {
    if ($(this).is(':checked')) {
        $('input[class="openModal2"]').not(this).prop('checked', false);
        nyansattid = $(this).closest("tr").find('td:eq(0)').text();
    }
});

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
function fjernAnsatt(){
    console.log("skift: " +indeks);
    console.log("ansatt:" +ansattid);
    $.ajax({
        url:'/deleteShift_has_employee',
        type: 'DELETE',
        data:{'shift_id':indeks,'employee_id':ansattid},
        success:function (data) {
            document.getElementById("successMessage").innerHTML = "Ansatt er fjernet";
            showSuccessMessage();
            getSwitchTable();
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
            getSwitchTable();
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
function fjernAnsatteRequestShift(skiftid){
    $.ajax({
        url:'/deleteRequest_shift',
        type:'DELETE',
        data:{'shift_id':skiftid},
        success:function (data) {
           deleteRequest(indeks);
            document.getElementById("successMessage").innerHTML = "Ansatt fjernet";
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
function deleteRequest(id) {
    $.ajax({
        url: '/deleteRequest',
        type:'DELETE',
        data:{'request_id':id},
        success:function (data) {
            //alert("Request slettet.");
            document.getElementById("successMessage").innerHTML = "";
            //showSuccessMessage();
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
function updateAbsence(id) {
    $.ajax({
        url: '/updateAbsence2',
        type:'POST',
        data:{'absence_id':id,'checked_by_admin':1},
        success:function (data) {
            document.getElementById("successMessage").innerHTML = "Fravær godkjent";
            showSuccessMessage();
            getAbsenceTable();
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
function updateOvertime(id) {
    $.ajax({
        url: '/updateOvertime2',
        type:'POST',
        data:{'overtime_id':id,'checked_by_admin':1},
        success:function (data) {
            document.getElementById("successMessage").innerHTML = "Overtid oppdatert";
            showSuccessMessage();
            getOvertimeTable();
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