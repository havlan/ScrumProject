//denne filen styrer logikken til myProfile.html
var test1 = require('../../controllers/testReq');
var bodyParser = require('body-parser');


var navn;

$(document).ready(function(){

    navn = test1.getNodeETest(req,res);
    document.getElementById("h1").innerHTML = navn;
})