/**
 * Created by LittleGpNator on 13.01.2017.
 */

$( document ).ready(function() {
    $(function(){
        $("#includedContent").load("troll");
    });
});


var myList= [];


$.get('/getVaktliste', {}, function(req, res, data){
    console.log(data);
    console.log(data.responseJSON[0]);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#excelDataTable')
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

    return columnSet;
}

function addHeader(myList, selector) {
    var columns = addAllColumnHeaders(myList, selector);
}

//function tableCreate(){
//    var body = document.body,
//        tbl  = document.createElement('table');
//    tbl.style.width  = '100px';
//    tbl.style.border = '1px solid black';
//
//    for(var i = 0; i < 3; i++){
//        var tr = tbl.insertRow();
//        for(var j = 0; j < 2; j++){
//            if(i == 2 && j == 1){
//                break;
//            } else {
//                var td = tr.insertCell();
//                td.appendChild(document.createTextNode('Cell'));
//                td.style.border = '1px solid black';
//                if(i == 1 && j == 1){
//                    td.setAttribute('rowSpan', '2');
//                }
//            }
//        }
//    }
//    body.appendChild(tbl);
//}
