var path = require('path');
var bodyParser = require('body-parser');
var dbMiddelware = require('../middlewares/dbQ1');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        dbMiddelware.getUserInfo(req,res);
        //dbMiddelware.getEmployeesWorking(req,res,datefrom,dateto);
        //res.redirect('/login');
    },

    getUser : function(req,res){
        //get user functionality here
        res.json({"Params": "\n" + req.params.id});
        console.log("GET user #" + ++totalgetReq + " " + JSON.stringify(req.body));
    },

    getLogin : function (req, res) {
        //res.sendFile(path.join(__dirname + '/../index.html'));
        res.json({"Msg":"Yodeliho"});
        console.log("GET index.html #" + ++totalgetReq + " today.");
    },
    //404 må være sist
    get404 : function (req, res) {
        res.send('what???', 404);
    }

}
