/**
 * Created by torsku on 16.01.2017.
 */
var myList = [];
var typeNames =[];
window.indeks = 0;
$.get('/getEmployee', {}, function(req, res, data){

    //$("#includedContent").load("menu");

    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#excelDataTable',myList);
    //tableCreate();
});
//Build Table

function buildHtmlTable(selector,list) {
    var columns = addAllColumnHeaders(list, selector);
    var tbody = $('<tbody/>');
    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr id=' + i + '/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = list[i][columns[colIndex]];
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
// remove employee logininfo
function removeFunction() {
   // alert(indeks);
    if (confirm("Er du sikker på at du vil fjerne denne brukeren?\n Informasjon om den ansatte vil fortsatt ligge i systemet,\n men den ansatte kan ikke lenger bruke det.") == true) {
        $.ajax({
            url: '/delUser', //this is the submit URL
            type: 'POST',
            data: {'employee_id':indeks},
            success: function (data) {
                document.getElementById("successMessage").innerHTML = "Brukeren er fjernet fra systemet";
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
}
//add employee logininfo
function addFunction() {
    document.getElementById("personInfo").style.display = "none";
    document.getElementById("personForm").style.display = "none";
    document.getElementById("logInInfo").style.display = "block";
    document.getElementById("remove").style.display = "none";
    document.getElementById("edit").style.display="none";
    document.getElementById("back").style.display="inline";
    document.getElementById("addInfo").style.display="none";

}
function hideForm() {
    document.getElementById('personForm').style.display = "none";
    document.getElementById("personInfo").style.display = "block";
    document.getElementById("edit").style.display = "inline";
    document.getElementById("remove").style.display = "inline";
    document.getElementById("back").style.display = "none";
    document.getElementById("logInInfo").style.display = "none";
    document.getElementById("addInfo").style.display="inline";
}

function hideInfo() {
    document.getElementById("personInfo").style.display = "none";
    document.getElementById("personForm").style.display = "block";
    document.getElementById("remove").style.display = "none";
    document.getElementById("edit").style.display="none";
    document.getElementById("back").style.display="inline";
    document.getElementById("back").style.display="inline";
    document.getElementById("addInfo").style.display="none";
}

$(function() {
    $('#logInInfo').on('submit', function (e) {
        alert(indeks);
        if (confirm("Er du sikker på at du vil lagre?") == true) {
            e.preventDefault();
            $.ajax({
                url: '/newLogin',
                type: 'POST',
                data: {'username': $('#username').val(), 'is_admin': $('#is_admin').val(),'employee_id':indeks},
                success: function (data) {
                    document.getElementById("successMessage").innerHTML = "Bruker lagt til systemet";
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
                failure: function (data) {
                    alert('Ansatt har allerede en bruker i systemet');
                }

            });
        }
    });
});

//myModal info
$(document).on('click','#excelDataTable td',function(){
    indeks = $(this).closest("tr").find('td:eq(2)').text();
  //  alert(indeks);
    var hei = indeks-1;
    var check = [];
    $.get('/getLoginInfoEmployee/'+indeks,{},function (req, res, data) {
        check = data.responseJSON;
        console.log(check);
    });
    $.get('/getEmployee', {}, function(req, res, data) {
        //Fyll inn redigeringsfelt
        document.getElementById("navndb").value = (data.responseJSON[hei].Navn);
        document.getElementById("stillingDropdown").value = (data.responseJSON[hei].Stilling);
        document.getElementById("telefondb").value = (data.responseJSON[hei].Tlf);
        document.getElementById("epostdb").value = (data.responseJSON[hei].Epost);
        document.getElementById("adressedb").value = (data.responseJSON[hei].Adresse);
        document.getElementById("personnummerdb").value = (data.responseJSON[hei].PersNr);
        //Fyll in oversiktsfelt
        document.getElementById("navndb2").innerHTML = (data.responseJSON[hei].Navn);
        document.getElementById("stillingdb2").innerHTML = (data.responseJSON[hei].Stilling);
        document.getElementById("telefondb2").innerHTML = (data.responseJSON[hei].Tlf);
        document.getElementById("epostdb2").innerHTML = (data.responseJSON[hei].Epost);
        document.getElementById("adressedb2").innerHTML = (data.responseJSON[hei].Adresse);
        document.getElementById("personnummerdb2").innerHTML = (data.responseJSON[hei].PersNr);
        if(check.length == 0){
            document.getElementById('addInfo').style.display = "inline";
            document.getElementById('remove').style.display = "none";
        }else{
            document.getElementById('addInfo').style.display = "none";
            document.getElementById('remove').style.display = "inline";
        }
        //Trigge modal
        $('#myModal').modal("show");
        //Felt under profilbilde
        $("#nameModal").val(data.responseJSON[hei].Navn);
        $("#positionModal").val(data.responseJSON[hei].Stilling);
    });
});
//addModal submit
$(function(){
    $('#addModal').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: '/newEmployee', //this is the submit URL
            type: 'POST',
            data: {'is_admin':parseInt($('#admin').text()),'username':$('#brukernavn').text(),'name': $("#fornavn").text(),'address':$('#adresse').text(),'email':$('#epost').text(),'type_name':$('#stilling').text(),'pers_id':parseInt($('#personnummer').text(),10),'phone_nr':parseInt($('#telefon').text(),10),'seniority':parseInt($('#seniority').text()),'responsibility_allowed':$('#responsibility').val(),'total_hours':0},
            success: function(data){
                document.getElementById("successMessage").innerHTML = "sendt";
                showSuccessMessage();
            },
            failure: function(err){
                console.log("ERR");
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
        $('#addModal').modal('toggle');
    });

});
//myModal edit
$(function(){
    $('#myModal').on('submit', function(e){
     //   alert($("#adressedb").val());
        e.preventDefault();
        var drpdn  = document.getElementById("stillingDropdown");
        var strUser = drpdn.options[drpdn.selectedIndex].text;
        $.ajax({
            url: '/updateEmployee',
            type: 'POST',
            data: {'name': $("#navndb").val(),'address':$('#adressedb').val(),'email':$('#epostdb').val(),'type_name':strUser,'pers_id':$('#personnummerdb').val(),'phone_nr':$('#telefondb').val(),'employee_id':indeks},
            success: function(data){
                console.log(JSON.stringify(data));
                document.getElementById("successMessage").innerHTML = "HEST ER BEST! HEST ER LIVET";
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

$.get('/getTypeNames', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON);

    typeNames = data.responseJSON;

    makeDropdown('#stilling');
    makeDropdown('#stillingDropdown');
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

function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
function showErrorMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}