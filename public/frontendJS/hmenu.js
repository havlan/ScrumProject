
$.get('/getClearenceLevel', {}, function(req, res, data){
    console.log(data);
    var clearence = data.responseJSON;
    console.log(clearence);
    if (clearence == 0) {
        showA();
    } else if (clearence == 1) {
        showK();
    } else if (clearence == 2) {
        showB();
    }
});
function showA() {
    document.getElementById("navButt1").style.display = 'block';
    document.getElementById("dropdown2").style.display = 'block';
    document.getElementById("dropdown1").style.display = 'block';
}
function showK() {
    document.getElementById("navButt2").style.display = 'block';
    document.getElementById("element7").style.display = 'block';
    document.getElementById("element8").style.display = 'block';
    document.getElementById("element9").style.display = 'block';
    document.getElementById("element10").style.display = 'block';
    document.getElementById("element11").style.display = 'block';
    document.getElementById("element12").style.display = 'block';
}
function showB() {
    document.getElementById("navButt1").style.display = 'block';
    document.getElementById("element1").style.display = 'block';
    document.getElementById("element2").style.display = 'block';
    document.getElementById("element3").style.display = 'block';
    document.getElementById("element4").style.display = 'block';
    document.getElementById("element5").style.display = 'block';
    document.getElementById("element6").style.display = 'block';
}