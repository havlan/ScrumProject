/**
 * Created by Knut-Egil on 17.01.2017.
 */

$(document).ready (function(){
    $("#successMessageBox").hide();
    $("#testButton").click(function showAlert() { //TODO
        $("#successMessageBox").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    });
});

//hide functions
$(document).ready(function(){
    $("#fravær").click(function(){
        $("#4").hide();
        $("#2").hide();
        $("#3").hide();
        $("#1").show();
    });
});

$(document).ready(function(){
    $("#overtid").click(function(){
        $("#1").hide();
        $("#4").hide();
        $("#3").hide();
        $("#2").show();
    });
});

$(document).ready(function(){
    $("#bytt").click(function(){
        $("#1").hide();
        $("#2").hide();
        $("#4").hide();
        $("#3").show();
    });
});

$(document).ready(function(){
    $("#bytt2").click(function(){
        $("#1").hide();
        $("#2").hide();
        $("#3").hide();
        $("#4").show();
    });
});


//fyll bokser

var myobject = {
};

var select = document.getElementById("selectvakt");
for(index in myobject) {
    select.options[select.options.length] = new Option(myobject[index], index);
}

//overtidsregning

var cc = new Date("09/13/2012 24:00");
var c = new Date("09/14/2012 09:50");
var shiftlength = parseInt("480");

function timeDifference(d, dd) {
    var minute = 60 * 1000,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        ms = Math.abs(d - dd);

    var minutes = parseInt(ms / minute, 10);

    ms -= minutes * minutes;

    return [
        (minutes-shiftlength) + " minutter overtid",
    ].join(", ");
};