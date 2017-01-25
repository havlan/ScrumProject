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
    getFrontpageSuperSite : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/frontpageSuper.html'));
    },
    getOverviewEmpSite : function (req, res) {
        res.sendFile(path.join(__dirname + '/../views/overviewEmp.html'));
    },
    getAvailabilitySite : function(req,res){
        res.sendFile(path.join(__dirname + '/../views/availability.html'));
    },
    getLogo : function (req,res){
        res.sendFile(path.join(__dirname + '/../public/img/MinVakt.png'));
    },
    getAdminShifts : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/adminShifts.html'));
    },
    getAppeal : function (req,res){
        res.sendFile(path.join(__dirname + '/../views/appeal.html'));
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
    getEmployee2 : function (req, res) {
        dbMiddelware.getEmployee2(req,res);
    },
    getOneEmployee : function(req,res){
        dbMiddelware.getOneEmployee(req,res);
    },
    getAbsenceView : function (req, res) {
        dbMiddelware.getAbsenceView(req,res);
    },
    getOvertimeView : function (req, res) {
        dbMiddelware.getOvertimeView(req,res);
    },
    getRequestView : function (req, res) {
        dbMiddelware.getRequestView(req,res);
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
    getEmployee_Shifts_toCurrentDate:function(req,res){
        dbMiddelware.getEmployee_Shifts_toCurrentDate(req,res);
    },
    getEmployee_Shifts_fromCurrentDate:function(req,res){
        dbMiddelware.getEmployee_Shifts_fromCurrentDate(req,res);
    },
    getVaktliste1:function(req,res){
        dbMiddelware.getVaktliste1(req,res);
    },
    getVaktliste2:function(req,res){
        dbMiddelware.getVaktliste2(req,res);
    },
    getVaktliste3:function(req,res){
        dbMiddelware.getVaktliste3(req,res);
    },
    getPersonalShiftEvents : function (req, res) {
        dbMiddelware.getPersonalShiftEvents(req,res);
    },
    getPossibleSiftsEvents : function (req, res) {
        dbMiddelware.getPossibleSiftsEvents(req,res);
    }
    ,
    getTypeNames : function (req, res) {
        dbMiddelware.getTypeNames(req,res);
    },
    getNextShiftForEmp : function (req, res) {
        dbMiddelware.getNextShiftForEmp(req,res);
    },

    getAvailability : function (req, res) {
      dbMiddelware.getAvailability(req,res);
    },
    getShiftChange : function (req, res){
        dbMiddelware.getShiftChange(req,res);
    },

    getAvailableEmpForShift : function (req, res) {
        dbMiddelware.getAvailableEmpForShift(req,res);
    },

    getAvailableShifts : function (req, res) {
        dbMiddelware.getAvailableShifts(req,res);
    },


    get403 : function (req, res) {
        res.status(403).sendFile(path.join(__dirname + '/../views/403.html'));
    },
    //404 må være sist
    get404 : function (req, res) {
        res.status(404).sendFile(path.join(__dirname + '/../views/404.html'));
        //res.send('what???', 404);
    },


}
