$(document).ready(function() {
    $("#includedContent").load("menu");

    $('#calendarx').fullCalendar({
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
        eventColor: '#000000', //default event color //can be set individually
        eventTextColor: '#ffffff', //default event text color
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        events: '/getPersonalShiftEvents', //TODO
        eventClick: function(event) {
            //TODO sumfin
            //elsempel, åpner event url
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
        }
    });
});