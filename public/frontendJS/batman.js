/**
 * Created by o_A_l on 13.01.2017.
 */


var test1 = require('../../controllers/testReq');
var bodyParser = require('body-parser');
var testinfo;


$("#add").onclick(function() {
    alert("heihei");
    test1.putJustaTest(req,res);
});

