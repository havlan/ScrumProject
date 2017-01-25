/**
 * Created by LittleGpNator on 17.01.2017.
 */



$(document).ready(function(){
    console.log("kjører");
    var isAdmin = req.session.passport.user.is_admin;
    console.log(isAdmin);
    if (isAdmin == 0) {
        console.log(isAdmin + "Denne brukeren er admin og har tilgang til alle sidene");
    } else if (isAdmin == 1) {
        console.log(isAdmin + "hallo");
    } else if (isAdmin == 2) {
        console.log(isAdmin + "oale");
    }
});
