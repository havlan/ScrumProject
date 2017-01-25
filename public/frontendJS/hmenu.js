/**
 * Created by LittleGpNator on 17.01.2017.
 */




$.get('/getClearenceLevel', {}, function(req, res, data){
    console.log(data);

    var clearence = data.responseJSON;

    console.log(clearence);

    if (clearence == 0) {
        console.log(clearence + "Denne brukeren er admin og har tilgang til alle sidene");
        document.getElementById("#dropdown1").style.display = 'none';
    } else if (clearence == 1) {

    } else if (clearence == 2) {
        console.log(clearence + "oale");
    }
});