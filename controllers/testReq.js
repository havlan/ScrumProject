var NodeETestMiddelware = require('../middlewares/NodeETestQ'); // kun for tester



module.exports = {
    putNodeETest : function(req,res){
        NodeETestMiddelware.putNodeETest(req,res);
    },
    getNodeETest : function(req,res){
        NodeETestMiddelware.getNodeETest(req,res);
    },
    postNodeETest : function(req,res){
        NodeETestMiddelware.postNodeETest(req,res);
    }

}