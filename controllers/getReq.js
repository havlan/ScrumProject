var path = require('path');
var bodyParser = require('body-parser');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        res.redirect('/login');
    },

    getUser : function(req,res){
        //get user functionality here
        res.json({"Params": "\n" + req.params.id});
        console.log("GET user #" + ++totalgetReq + " today. \n" + JSON.stringify(req.body));
    },

    getLogin : function (req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
        console.log("GET index.html #" + ++totalgetReq + " today.");
    }

}
