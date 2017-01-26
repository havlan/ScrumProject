/**
 * Created by LittleGpNator on 17.01.2017.
 */




$.get('/getClearenceLevel', {}, function(req, res, data){
    console.log(data);

    var clearence = data.responseJSON;

    console.log(clearence);

    if (clearence == 0) {
        //console.log(clearence + "Denne brukeren er admin og har tilgang til alle sidene");
        document.getElementById("element12").style.display = 'block';
        showB();
        showK();
    } else if (clearence == 1) {
        document.getElementById("dropdown2").style.display = 'block';
        document.getElementById("element7").style.display = 'block';
        document.getElementById("element8").style.display = 'block';
        document.getElementById("element9").style.display = 'block';
        document.getElementById("element10").style.display = 'block';
    } else if (clearence == 2) {
        document.getElementById("dropdown1").style.display = 'block';
        document.getElementById("element1").style.display = 'block';
        document.getElementById("element2").style.display = 'block';
        document.getElementById("element3").style.display = 'block';
        document.getElementById("element4").style.display = 'block';
        document.getElementById("element5").style.display = 'block';
        document.getElementById("element6").style.display = 'block';
    }
});


function showK() {
    document.getElementById("dropdown2").style.display = 'block';
    document.getElementById("element7").style.display = 'block';
    document.getElementById("element8").style.display = 'block';
    document.getElementById("element9").style.display = 'block';
    document.getElementById("element10").style.display = 'block';
    document.getElementById("element11").style.display = 'block';
}
function showB() {
    document.getElementById("dropdown1").style.display = 'block';
    document.getElementById("element1").style.display = 'block';
    document.getElementById("element2").style.display = 'block';
    document.getElementById("element3").style.display = 'block';
    document.getElementById("element4").style.display = 'block';
    document.getElementById("element5").style.display = 'block';
    document.getElementById("element6").style.display = 'block';
}