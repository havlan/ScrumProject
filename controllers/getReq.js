var path = require('path');
var bodyParser = require('body-parser');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        res.sendFile(path.join(__dirname + '../index.html'));
        console.log("GET index.html #" + ++totalgetReq + " today.");
    },

    getUser : function(req,res){
        //get user functionality here
        res.json({"Params": "\n" + req.params.id});
        console.log("GET user #" + ++totalgetReq + " today. \n" + JSON.stringify(req.body));
    }


    /*getRoot:app.get('/',function(req,res){
        res.sendFile(path.join(__dirname + '../index.html'));
        console.log("GET INDEX.HTML #" + ++totalgetReq + " today.");

    })*/

}
/*exports.getRoot = function(app){
    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname + '../index.html'));
        console.log("GET INDEX.HTML #" + ++totalgetReq + " today.");
    })

}*/