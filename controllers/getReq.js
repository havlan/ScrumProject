var path = require('path');
var bodyParser = require('body-parser');
var dbMiddelware = require('../middlewares/dbQ1');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        res.redirect('/login');
        //res.sendFile(path.join(__dirname + '/../index.html'));
    },

    getUser : function(req,res){
        //get user functionality here
        res.json({"Params": "" + req.params.id});
        console.log("GET user #" + ++totalgetReq + " " + JSON.stringify(req.body));
    },
    //Windows
    getLogin : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/Login.html'));
    },
    getMenu : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/menu.html'));
    },
    getOverviewForAdmin : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/overviewForAdmin.html'));
    },
    getMyProfile : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/myProfile.html'));
    },
    getVaktoversikt : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/vaktoversikt.html'));
    },
    getCalendar : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/calendarA.html'));
    },
    getLogo : function (req,res){
        res.sendFile(path.join(__dirname + '/../public/lib/MinVakt.png'));
    },



    submitLogin : function (req, res) {
        //res.sendFile(path.join(__dirname + '/../index.html'));
        //res.json({"Msg":"Yodeliho"});
        //console.log("GET index.html #" + ++totalgetReq + " today.");
        dbMiddelware.getSaltHash(req,res);
    },

    getEmployee : function (req, res){
      dbMiddelware.getEmployee(req,res);
    },
    getDepartment : function (req, res){
        console.log("DEPARTMENT REQUEST" + req.params.department_id);
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
    getEmployee_shifts_toCurrentDate:function(req,res){
        dbMiddelware.getEmployee_shifts_toCurrentDate(req,res);
    },


    //404 må være sist
    get404 : function (req, res) {
        res.status(404).send("<h1>Fokken hell m8</h1>");
        //res.send('what???', 404);
    },


}
