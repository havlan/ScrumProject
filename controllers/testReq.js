var NodeETestMiddelware = require('../middlewares/NodeETestQ'); // kun for tester
var path = require('path');


module.exports = {
    putNodeETest : function(req,res){
        NodeETestMiddelware.putNodeETest(req,res);
    },
    getNodeETest : function(req,res){
        //res.sendFile(path.join(__dirname + '/../public/html/myProfile.html'));
        NodeETestMiddelware.getNodeETest(req,res);
    },
    postNodeETest : function(req,res){
        NodeETestMiddelware.postNodeETest(req,res);
    },
    getEmployeeOvertime : function (req,res) {
        NodeETestMiddelware.getEmployeeOvertime(req,res);
    }
}