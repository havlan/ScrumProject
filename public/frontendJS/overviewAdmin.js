/**
 * Created by torsku on 16.01.2017.
 */
var myList = [];
var typeNames =[];
window.indeks = 0;
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

function buildHtmlTable(selector,list) {
    list = myList;
    var columns = addAllColumnHeaders(list, selector);
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
    alert(indeks);
    if (confirm("Er du sikker på at du vil fjerne denne ansatte?\n Informasjon om den ansatte vil fortsatt ligge i systemet\n Men den ansatte kan ikke lenger bruke det") == true) {
        $.ajax({
            url: '/delUser', //this is the submit URL
            type: 'POST',
            data: {'employee_id':indeks},
            success: function(data){
                alert('successfully submitted')
            }
        });
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
    if (confirm("Er du sikker på at du vil lagre?") == true) {

    }
}

//myModal info
$(document).on('click','#excelDataTable tr',function(){
    indeks = $(this).closest("tr").find('td:eq(2)').text();
  //  alert(indeks);
    var hei = indeks-1;
    $.get('/getEmployee', {}, function(req, res, data) {
        //Fyll inn redigeringsfelt
        document.getElementById("navndb").value = (data.responseJSON[hei].name);
        document.getElementById("stillingdb").value = (data.responseJSON[hei].type_name);
        document.getElementById("telefondb").value = (data.responseJSON[hei].phone_nr);
        document.getElementById("epostdb").value = (data.responseJSON[hei].email);
        document.getElementById("adressedb").value = (data.responseJSON[hei].address);
        document.getElementById("personnummerdb").value = (data.responseJSON[hei].pers_id);
        //Fyll in oversiktsfelt
        document.getElementById("navndb2").innerHTML = (data.responseJSON[hei].name);
        document.getElementById("stillingdb2").innerHTML = (data.responseJSON[hei].type_name);
        document.getElementById("telefondb2").innerHTML = (data.responseJSON[hei].phone_nr);
        document.getElementById("epostdb2").innerHTML = (data.responseJSON[hei].email);
        document.getElementById("adressedb2").innerHTML = (data.responseJSON[hei].address);
        document.getElementById("personnummerdb2").innerHTML = (data.responseJSON[hei].pers_id);
        //Trigge modal
        $('#myModal').modal("show");
        //Felt under profilbilde
        $("#nameModal").val(data.responseJSON[hei].name);
        $("#positionModal").val(data.responseJSON[hei].type_name);
    });
});
//addModal submit
$(function(){
    $('#addModal').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: '/newEmployee', //this is the submit URL
            type: 'POST',
            data: {'is_admin':$('#admin').val(),'username':$('#brukernavn').val(),'name': $("#fornavn").val(),'address':$('#adresse').val(),'email':$('#epost').val(),'type_name':$('#stilling').val(),'pers_id':$('#personnummer').val(),'phone_nr':$('#telefon').val(),'seniority':$('#seniority').val(),'responsibility_allowed':$('#responsibility').val(),'total_hours':0},
            success: function(data){

            },
            failure: function(err){
                console.log("ERR");
            }
        });
    });
});
//myModal edit
$(function(){
    $('#myModal').on('submit', function(e){
     //   alert($("#adressedb").val());
        e.preventDefault();
       // alert(indeks);
        $.ajax({
            url: '/updateEmployee',
            type: 'POST',
            data: {'name': $("#navndb").val(),'address':$('#adressedb').val(),'email':$('#epostdb').val(),'type_name':$('#stillingdb').val(),'pers_id':$('#personnummerdb').val(),'phone_nr':$('#telefondb').val(),'employee_id':indeks},
            success: function(data){
                console.log(JSON.stringify(data));
                document.getElementById('newUserFeedback').innerHTML("Success");
            }
        });
    });
});

$.get('/getTypeNames', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON);

    typeNames = data.responseJSON;

    makeDropdown('#stilling')
});

function makeDropdown(selector) {
    var columns = addAllColumnHeaders(typeNames, selector);
    for (var i = 0; i < typeNames.length; i++) {
        var cellValue1 = typeNames[i][columns[0]];
        if (cellValue1 == null) cellValue1 = "Ingen data fra DB";
        var option = $('<option />').text(cellValue1);
        $(selector).append(option);
    }
}


