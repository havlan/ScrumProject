var path = require('path');
var bodyParser = require('body-parser');
var dbMiddelware = require('../middlewares/dbQ1');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        //res.redirect('/login'); //
        console.log("ROOT: ",req.session);
        console.log("GET ROOT", req.isAuthenticated());
        res.sendFile(path.join(__dirname + '/../views/hMenu.html'));
    },

    getUser : function(req,res){
        //get user functionality here
        res.sendFile(path.join(__dirname + '/../views/smashing.html'));
    },
    getLogin : function (req,res) {
        res.sendFile(path.join(__dirname + '/../views/login.html'));
    },

    //Site
    getOnePagedMenu : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/OnePagedMenu.html'));
    },

    //Sites
    getLoginSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/Login.html'));
    },
    getMenuSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/hMenu.html'));
    },
    getOverviewForAdminSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/overviewForAdmin.html'));
    },
    getMyProfileSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/myProfile.html'));
    },
    getVaktoversiktSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/vaktoversikt.html'));
    },
    getCalendarSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/calendar.html'));
    },
    getApprovalAdminSite : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/approvalAdmin.html'));
    },
    getFrontpageAdminSite : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/frontpageAdmin.html'));
    },
    getLogo : function (req,res){
        res.sendFile(path.join(__dirname + '/../public/img/MinVakt.png'));
    },




    submitLogin : function (req, res) {
        //res.sendFile(path.join(__dirname + '/../index.html'));
        //res.json({"Msg":"Yodeliho"});
        //console.log("GET index.html #" + ++totalgetReq + " today.");
        dbMiddelware.getSaltHash(req,res);
 remotes/origin/frontEnd
    },

    getEmployee : function (req, res){
      dbMiddelware.getEmployee(req,res);
    },
    getOneEmployee : function(req,res){
        dbMiddelware.getOneEmployee(req,res);
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
        //dbMiddelware.getEmployee_shifts_toCurrentDate(req,res);
    },
    getVaktliste:function(req,res){
        dbMiddelware.getVaktliste(req,res);
    },
    getEvents : function (req,res) {
        dbMiddelware.getEvents(req,res);
    },


    //404 må være sist
    get404 : function (req, res) {
        res.status(404).sendFile(path.join(__dirname + '/../views/404.html'));
        //res.send('what???', 404);
    },


}
