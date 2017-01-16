/**
 * Created by Lui on 14-Jan-17.
 */


(document).ready(function() {
    $("#includedContent").load("Login");
});


function openMenu() {
    if (document.getElementById("dropdown_box").className.match("hidden")) {
        document.getElementById("dropdown_box").className = "shown";
        document.getElementById("dropdown_box").innerHTML = "blabla";
    } else {
        document.getElementById("dropdown_box").className = "hidden";
    }
}


/**
 function changeWindow(toWindow) {
  var windows = ["CALENDAR", "DAY", "DISPONIBILITY", "REQUESTS", "PEOPLE", "PROFILE", "HISTORY"];
  for (String s : myStringArray){
    if (s.classList.contains("shown")) {
      document.getElementById("s").className = "hidden";
    }
  }
  document.getElementById("toWindow").className = "shown";
}

 function logout(){
         TODO
}**/

function addNotification(ica, id) {
    var notif = "<div class='notification' id='" + id + "'><div class='notification_text'>" + ica + "</div><a id='1' class='notification_button' href='javascript:void(0)' onclick='changeClass()' title='Butt'>butt</a>" + "</div>";

    document.getElementById("notifications_box").innerHTML += notif;
}

function changeClass() {
    document.getElementById('testID').className = 'notification_seen';
    document.getElementById('testID').classList.remove("notification_not_seen");
    document.getElementById('1').className = 'notification_button_seen';
    document.getElementById('1').classList.remove("notification_button_not_seen");
}


function fillDiv() {
    document.getElementById('main_content').innerHTML = calendarAndNotifications.html;
}
fillDiv();

