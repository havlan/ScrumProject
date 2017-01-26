

var myList = [];
var typeNames =[];
window.indeks = 0;
var currentDay = new Date();
var currentWeek = getWeekNumber(currentDay);
console.log(currentWeek);
var selectedWeek = currentWeek[1];


$.get('/getAvailability', {}, function(req, res, data){

    console.log(data);
    console.log(data.responseJSON);
    myList = data.responseJSON;
   // buildHtmlTable('#TingTang',myList);
    //tableCreate();




    $( "#available-next" ).click(function neste() {
        selectedWeek++;
        console.log(selectedWeek);



    });

    $( "#available-prev" ).click(function forrige() {
        selectedWeek--;
    });



    $('#available').on('click', function(){
        if ( $(boxs).hasClass( 'highlight' ) ) {
            $('.highlight').removeClass('unavailable');
            $('.highlight').each(function() {
                var aval1 = 1;
                var date;

            });



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


    for(i=0; i<myList.length; i++) {

        var tableDay = data.responseJSON[i].day;
        var available1 = data.responseJSON[i].availability;
        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = tableDay.split(/[- T : . Z]/);

        // Apply each element to the Date function
        var jsDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

        console.log(jsDate);
        var weekNr = getWeekNumber(jsDate);
        console.log(weekNr)
        var weekDay = jsDate.getDay();
        var hour = jsDate.getHours();






        if (selectedWeek == weekNr[1]) {
            if (weekDay == 1) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("man1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("man1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("man2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("man2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("man3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("man3");
                        start.classList.add("unavailable");
                    }
                }
            }

            if (weekDay == 2) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("tir1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("tir1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("tir2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("tir2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("tir3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("tir3");
                        start.classList.add("unavailable");
                    }
                }
            }

            if (weekDay == 3) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("ons1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("ons1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("ons2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("ons2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("ons3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("ons3");
                        start.classList.add("unavailable");
                    }
                }
            }

            if (weekDay == 4) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("tor1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("tor1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("tor2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("tor2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("tor3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("tor3");
                        start.classList.add("unavailable");
                    }
                }
            }

            if (weekDay == 5) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("fre1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("fre1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("fre2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("fre2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("fre3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("fre3");
                        start.classList.add("unavailable");
                    }
                }
            }

            if (weekDay == 6) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("lør1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("lør1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("lør2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("lør2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("lør3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("lør3");
                        start.classList.add("unavailable");
                    }
                }
            }

            if (weekDay == 0) {
                if (hour >= 8 && hour < 16) {
                    if (available1 == 0) {
                        var start = document.getElementById("søn1");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("søn1");
                        start.classList.add("unavailable");
                    }

                } else if (hour >= 16 && hour < 24) {
                    if (available1 == 0) {
                        var start = document.getElementById("søn2");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("søn2");
                        start.classList.add("unavailable");
                    }


                } else if (hour >= 0 && hour < 8) {
                    if (available1 == 0) {
                        var start = document.getElementById("søn3");
                        start.classList.add("available");
                    } else if (available1 == 1) {
                        var start = document.getElementById("søn3");
                        start.classList.add("unavailable");
                    }
                }
            }


        }


    }





});




function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
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








    /* This 'event' is used just to avoid that the table text
     * gets selected (just for styling).
     * For example, when pressing 'Shift' keyboard key and clicking
     * (without this 'event') the text of the 'table' will be selected.
     * You can remove it if you want, I just tested this in
     * Chrome v30.0.1599.69 */
    $(document).bind('selectstart dragstart', function(e) {
        e.preventDefault(); return false;
    });


    function placeAvalability(selector, list) {

    }
});


function assignDate() {

    var dag = "tir1";




}


