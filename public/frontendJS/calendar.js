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
        businessHours: [{
            dow: [1, 2, 3, 4, 5 ],
            start: '00:00',
            end: '24:00'},],
        editable: false,
        eventColor: '#aabfe0', //default event color //can be set individually
        eventTextColor: '#000000', //default event text color
        //GETTING EVENTS FROM JSON FEED; SHORT AND EXTENDED
        events: 'events.json', //TODO
    });
});