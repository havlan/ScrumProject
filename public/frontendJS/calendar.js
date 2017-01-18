/**
 * Created by LittleGpNator on 17.01.2017.
 */

$(document).ready(function() {
    $("#includedContent").load("menu");

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,listMonth'
        },
        firstDay: 1,
        displayEventEnd: true,
        timeFormat: 'H:mm',
        eventLimit: true,
        locale: 'nb',
        weekNumbers:true,
        navLinks: true,
        editable: false,
        eventColor: '#aabfe0', //default event color //can be set individually
        eventTextColor: '#000000', //default event text color
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        events: '/getEvents', //TODO
    });
});