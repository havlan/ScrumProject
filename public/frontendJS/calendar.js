$(document).ready(function() {

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
        eventColor: '#7bc7ff', //default event color //can be set individually
        eventTextColor: '#000000', //default event text color
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        eventSources: [
            {
                url: '/getEvents', // use the `url` property
                color: 'green',    // an option!
                textColor: 'black'  // an option!
            },
            {
                url: '/getEvents', // use the `url` property
                color: 'yellow',    // an option!
                textColor: 'black'  // an option!
            }],
        eventClick: function(event) {
            //TODO sumfin
            //elsempel, åpner event url
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
        }
    });
});