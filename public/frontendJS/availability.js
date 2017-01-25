

var myList = [];
var typeNames =[];
window.indeks = 0;

$.get('/getAvailability', {}, function(req, res, data){

    console.log(data);
    console.log(data.responseJSON);
    myList = data.responseJSON;
   // buildHtmlTable('#TingTang',myList);
    //tableCreate();


    for(i=0; i<7; i++){

        var tableDay = data.responseJSON[i].day;
        var available1 = data.responseJSON[i].availability;
        console.log(tableDay);
        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = tableDay.split(/[- T : . Z]/);

        // Apply each element to the Date function
        var jsDate = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

        console.log(jsDate);

    console.log(jsDate);
    var currentDay = new Date();
    var weekDay = jsDate.getDay();

    var hour = jsDate.getHours();

    document.getElementById("demo1").innerHTML = weekDay;
    document.getElementById("demo2").innerHTML = hour;
    console.log(weekDay);

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


    function placeAvalability(selector, list) {

    }
});



