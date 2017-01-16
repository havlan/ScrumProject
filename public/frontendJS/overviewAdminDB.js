/**
 * Created by torsku on 16.01.2017.
 */

    $(document).ready(function getInfo(){
        $.get("/getEmployee",{},function (req, res,data) {
            document.getElementById("firstnamedb").innerHTML = data.responseJSON[0].name;
            document.getElementById("lastnamedb").innerHTML = data.responseJSON[0].name;
            document.getElementById("posdb").innerHTML = data.responseJSON[0].type_name;
            document.getElementById("phonedb").innerHTML = data.responseJSON[0].phone_nr;
            document.getElementById("emaildb").innerHTML = data.responseJSON[0].email;
            document.getElementById("addressdb").innerHTML = data.responseJSON[0].address;
          //  document.getElementById("persnodb").innerHTML = data.responesJSON[0].pers_id;
        });
    /*    $.get("/getLogInInfo",{},function (req, res, data) {
            document.getElementById("usernamedb").innerHTML = data.responseJSON[0].username;
        })*/
    });

