/**
 * Created by o_A_l on 13.01.2017.
 */

alert("SATAN");

var test1 = require('../../controllers/testReq');
var bodyParser = require('body-parser');
var testinfo;


$(document).ready(function() {
    testinfo = test1.getBatman(req,res);
    document.getElementById("h1").innerHTML = bodyParser;
});

