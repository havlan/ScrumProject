



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



