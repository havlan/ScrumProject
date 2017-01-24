

var myList = [];
var typeNames =[];
window.indeks = 0;

$.get('getAvailability', {}, function(req, res, data){

    //$("#includedContent").load("menu");

    console.log(data);
    console.log(data.responseJSON);
    myList = data.responseJSON;
    //document.getElementById("data").innerHTML = myList;

    buildHtmlTable('#TingTang',myList);
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







$(function() {

    /* Get all rows from your 'table' but not the first one
     * that includes headers. */
    var rows = $('tr').not(':first');
    var boxs = $('td');



    boxs.on('click', function(e) {

        /* Get current row */
        var box = $(this);

        /* Check if 'Ctrl', 'cmd' or 'Shift' keyboard key was pressed
         * 'Ctrl' => is represented by 'e.ctrlKey' or 'e.metaKey'
         * 'Shift' => is represented by 'e.shiftKey' */
        if ((e.ctrlKey || e.metaKey) || e.shiftKey) {
            /* If pressed highlight the other row that was clicked */
            box.addClass('highlight');
        } else {
            /* Otherwise just highlight one row and clean others */
            boxs.removeClass('highlight');
            rows.removeClass('highlight');
            box.addClass('highlight');

        }

    });


    /* Create 'click' event handler for rows */
    $('#1').on('click', function(e) {

        /* Get current row */
        var row = $('#2');

        /* Check if 'Ctrl', 'cmd' or 'Shift' keyboard key was pressed
         * 'Ctrl' => is represented by 'e.ctrlKey' or 'e.metaKey'
         * 'Shift' => is represented by 'e.shiftKey' */
        if ((e.ctrlKey || e.metaKey) || e.shiftKey) {
            /* If pressed highlight the other row that was clicked */
            row.addClass('highlight');
        } else {
            /* Otherwise just highlight one row and clean others */
            rows.removeClass('highlight');
            row.addClass('highlight');
        }

    });

    $('#3').on('click', function(e) {

        /* Get current row */
        var row = $('#4');

        /* Check if 'Ctrl', 'cmd' or 'Shift' keyboard key was pressed
         * 'Ctrl' => is represented by 'e.ctrlKey' or 'e.metaKey'
         * 'Shift' => is represented by 'e.shiftKey' */
        if ((e.ctrlKey || e.metaKey) || e.shiftKey) {
            /* If pressed highlight the other row that was clicked */
            row.addClass('highlight');
            $('#3').removeClass('highlight');
        } else {
            /* Otherwise just highlight one row and clean others */
            rows.removeClass('highlight');
            row.addClass('highlight');
        }

    });

    $('#5').on('click', function(e) {

        /* Get current row */
        var row = $('#6');

        /* Check if 'Ctrl', 'cmd' or 'Shift' keyboard key was pressed
         * 'Ctrl' => is represented by 'e.ctrlKey' or 'e.metaKey'
         * 'Shift' => is represented by 'e.shiftKey' */
        if ((e.ctrlKey || e.metaKey) || e.shiftKey) {
            /* If pressed highlight the other row that was clicked */
            row.addClass('highlight');
        } else {
            /* Otherwise just highlight one row and clean others */
            rows.removeClass('highlight');
            row.addClass('highlight');
        }

    });

    $('#available').on('click', function(){
        if ( $(boxs).hasClass( 'highlight' ) ) {
            $('.highlight').removeClass('unavailable');
            $('.highlight').each(function() {
                alert( this.id );
            });
            $('.highlight').addClass('available').removeClass('highlight');

        }

    });

    $('#unavailable').on('click', function(){
        if ( $(boxs).hasClass( 'highlight' ) ) {
            $('.highlight').removeClass('available');
            $('.highlight').each(function() {
                alert( this.id );
            });
            $('.highlight').addClass('unavailable').removeClass('highlight');
        }

    });






    /* This 'event' is used just to avoid that the table text
     * gets selected (just for styling).
     * For example, when pressing 'Shift' keyboard key and clicking
     * (without this 'event') the text of the 'table' will be selected.
     * You can remove it if you want, I just tested this in
     * Chrome v30.0.1599.69 */
    $(document).bind('selectstart dragstart', function(e) {
        e.preventDefault(); return false;
    });

});



