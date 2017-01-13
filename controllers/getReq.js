var path = require('path');
var bodyParser = require('body-parser');
var dbMiddelware = require('../middlewares/dbQ1');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        //res.redirect('/login'); //
        res.sendFile(path.join(__dirname + '/../index.html'));
    },

    getUser : function(req,res){
        //get user functionality here
        res.json({"Params": "" + req.params.id});
        console.log("GET user #" + ++totalgetReq + " " + JSON.stringify(req.body));
    },

    getLogin : function (req, res) {
        //res.sendFile(path.join(__dirname + '/../index.html'));
        res.json({"Msg":"Yodeliho"});
        console.log("GET index.html #" + ++totalgetReq + " today.");
    },

    getEmployee : function (req, res){
      dbMiddelware.getEmployee(req,res);
    },
    getDepartment : function (req, res){
        dbMiddelware.getDepartment(req,res);
    },
    getType : function (req, res){
        dbMiddelware.getType(req,res);
    },
    getShift : function (req, res) {
        dbMiddelware.getShift(req,res);
    },
    getShift_has_employee : function (req, res){
        dbMiddelware.getShift_has_employee(req,res);
    },
    getRequest : function (req, res){
        dbMiddelware.getRequest(req,res);
    },
    getAbsence : function (req, res){
        dbMiddelware.getAbsence(req,res);
    },
    getOvertime : function (req, res){
        dbMiddelware.getOvertime(req,res);
    },
    getUserInfo : function (req, res) {

    },
   /**
    getVaktoversikt : function (req, res){
        //oversikt over vaktlister
        //res.sendFile(path.join(__dirname + '/../views/Vaktoversikt.html'));
    },
    */

    //404 må være sist
    get404 : function (req, res) {
        res.status(404).send("<h1>Fokken hell m8</h1>");
        //res.send('what???', 404);
    },


}
