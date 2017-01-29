var myList = [];
var typeNames = [];
window.indeks = 0;
var currentDay = new Date();
var currentWeek = getWeekNumber(currentDay);
var selectedWeek = currentWeek[1];


$.get('/getAvailability', {}, function (req, res, data) {
    myList = data.responseJSON;
    // buildHtmlTable('#TingTang',myList);
    //tableCreate();
        for (i = 0; i < myList.length; i++) {

            var tableDay = data.responseJSON[i].day;
            var available1 = data.responseJSON[i].availability;
            // Split timestamp into [ Y, M, D, h, m, s ]
            var t = tableDay.split(/[- T : . Z]/);

            // Apply each element to the Date function
            var jsDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
            var weekNr = getWeekNumber(jsDate);
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
    d.setHours(0, 0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}



// fane nr 2


function addRow(content, morecontent, evenmorecontent) {
    if (!document.getElementsByTagName) return;
    tabBody = document.getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");
    cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    cell3 = document.createElement("td");
    textnode1 = document.createTextNode(content);
    textnode2 = document.createTextNode(morecontent);
    textnode3 = document.createTextNode(evenmorecontent);
    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    cell3.appendChild(textnode3);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tabBody.appendChild(row);


}


var dates = [];
var availabilities = [];

function makeJsonArray() {

    var yarr = [];
    for (v = 0; v < dates.length; v++) {
        yarr[v] = new Array(2);
        yarr[v][0] = dates[v];
        yarr[v][1] = availabilities[v];
    }

    $.ajax({
        url: '/bulkAvail',
        type: 'POST',
        data: {'availarray': yarr},
        success:function (data) {
            document.getElementById("successMessage").innerHTML = "Overtid oppdatert";
            showSuccessMessage();
            getOvertimeTable();
        },
        error: function(xhr){
            if(xhr.status==404){
                document.getElementById("errorMessage").innerHTML = "ikke funnet";
                showErrorMessage();
            } else if(xhr.status==409){
                document.getElementById("warningMessage").innerHTML = "tilgjengelighet er allerede registrert";
                showWarningMessage();
            } else {
                document.getElementById("errorMessage").innerHTML = "Det har oppstått en feil";
                showErrorMessage();
            }
        }
    })



    dates.length = 0;
    availabilities.length = 0;
    var new_tbody = document.createElement('tbody');
    var old_tbody = tabBody;
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody)



}

    function emptyTable() {
        dates.length = 0;
        availabilities.length = 0;
        var new_tbody = document.createElement('tbody');
        var old_tbody = tabBody;
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody)

    }

    function getAvailable() {
        var valid = document.getElementById('AvaDate').validity.valid;
        if (valid == true) {
            var dagvakt = document.getElementById("AvaDay");
            var kveldsvakt = document.getElementById("AvaEvening");
            var nattevakt = document.getElementById("AvaNight");
            var availability = 0;
            var checkboxes = [dagvakt, kveldsvakt, nattevakt];
            AvaDate = document.getElementById("AvaDate").value;

            var yarr = [];
            for (i = 0; i < checkboxes.length; i++) {
                yarr[i] = new Array(2);
                if (checkboxes[i].checked == true) {
                    if (checkboxes[i] == dagvakt) {
                        var Dato = AvaDate + " 08:00:00";
                        var vakt = "dagvakt";
                        if (typeof AvaDate != 'undefined' && typeof vakt != 'undefined') { // //if($('#ava-choices').closest("tr").find('td:eq(2)').text() == "ja"){
                            addRow(vakt, Dato, "ja");
                            dates.push(Dato);
                            availabilities.push(availability);
                        }
                    } else if (checkboxes[i] == kveldsvakt) {
                        var Dato = AvaDate + " 16:00:00";
                        var vakt = "kveldsvakt";
                        if (typeof AvaDate != 'undefined' && typeof vakt != 'undefined') {
                            addRow(vakt, Dato, "ja");
                            dates.push(Dato);
                            availabilities.push(availability);

                        }
                    } else if (checkboxes[i] == nattevakt) {
                        var Dato = AvaDate + " 00:00:00";
                        var vakt = "nattevakt";
                        if (typeof AvaDate != 'undefined' && typeof vakt != 'undefined') {
                            addRow(vakt, Dato, "ja");
                            dates.push(Dato);
                            availabilities.push(availability);
                        }
                    }
                }
            }
            return yarr;

        }
    }

    function getUnavailable() {
        var valid = document.getElementById('AvaDate').validity.valid;
        if (valid == true) {
            var dagvakt = document.getElementById("AvaDay");
            var kveldsvakt = document.getElementById("AvaEvening");
            var nattevakt = document.getElementById("AvaNight");
            var availability = 1;
            var checkboxes = [dagvakt, kveldsvakt, nattevakt];

            AvaDate = document.getElementById("AvaDate").value;

            for (i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked == true) {
                    if (checkboxes[i] == dagvakt) {
                        var Dato = AvaDate + " 08:00:00";
                        var vakt = "dagvakt";
                        if (typeof AvaDate !== 'undefined' && typeof vakt !== 'undefined') {
                            addRow(vakt, Dato, "nei");
                            dates.push(Dato);
                            availabilities.push(availability);
                        }
                    }
                    else if (checkboxes[i] == kveldsvakt) {
                        var Dato = AvaDate + " 16:00:00";
                        var vakt = "kveldsvakt";
                        if (typeof AvaDate !== 'undefined' && typeof vakt !== 'undefined') {
                            addRow(vakt, Dato, "nei");
                            dates.push(Dato);
                            availabilities.push(availability);
                        }
                    }

                    else if (checkboxes[i] == nattevakt) {
                        var Dato = AvaDate + " 00:00:00";
                        var vakt = "nattevakt";
                        if (typeof AvaDate !== 'undefined' && typeof vakt !== 'undefined') {
                            addRow(vakt, Dato, "nei");
                            dates.push(Dato);
                            availabilities.push(availability);
                        }
                    }
                }

            }
        }

    }


    function fillAvailabilityArray(date, availablity) {
        var AvalabilityJson;
        AvalabilityJson = {
            "availability": [availablity],
            "day": ""[date]
        };


    }

function showSuccessMessage() {
    var element = document.getElementById('successMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}
function showErrorMessage() {
    var element = document.getElementById('errorMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}

function showWarningMessage() {
    var element = document.getElementById('warningMessageBox');
    element.style.display = "block";
    setTimeout(function() {
        element.style.display = "none";
    }, 3000);
}