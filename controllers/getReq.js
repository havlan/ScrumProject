var path = require('path');
var bodyParser = require('body-parser');
var dbMiddelware = require('../middlewares/dbQ1');
var dbHelper = require('../helpers/db');
var totalgetReq = 0;


module.exports = {

    getRoot : function(req,res){
        res.sendFile(path.join(__dirname + '/../views/hMenu.html'));
    },

    getUser : function(req,res){
        res.sendFile(path.join(__dirname + '/../views/smashing.html'));
    },

    getLogin : function (req,res) {
        res.sendFile(path.join(__dirname + '/../views/login.html'));
        //res.render(path.join(__dirname + '/../views/login'));
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
        dbMiddelware.getSaltHash(req,res);
    },

    getEmployee : function (req, res){
        dbHelper.getdbQuery(req, res, "select phone_nr as Tlf,total_hours as Timer, employee_id as AnsattID,email as Epost,seniority as Stillingsprosent,responsibility_allowed as Ansvarsvakt, type_name as Stilling, name as Navn, address as Adresse, pers_id as PersNr from Employee");
    },
    getOneEmployee : function(req,res){
        dbHelper.getdbQuery(req, res, "select * from Employee where employee_id = ?",req.session.passport.user.id);

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
        dbHelper.getdbQuery(req, res, "select * from Department"); // where department_id = ?",req.body.department_id);
    },
    getType : function (req, res){
        dbHelper.getdbQuery(req, res, "select * from Type");
    },
    getShift : function (req, res) {
        dbHelper.getdbQuery(req, res, "select * from Shift");
    },
    getShift_has_employee : function (req, res){
        dbHelper.getdbQuery(req, res, "select * from shift_has_employee");
    },
    getRequest : function (req, res){
        dbHelper.getdbQuery(req, res, "select * from Request");
    },
    getAbsence : function (req, res){
        dbHelper.getdbQuery(req, res, "select * from Absence");
    },
    getOvertime : function (req, res){
        dbHelper.getdbQuery(req, res, "select * from Overtime");
    },
    getEmployee_Shifts_toCurrentDate:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from Employee_Shifts_toCurrentDate where employee_id = ?",[req.session.passport.user.id]);
    },
    getVaktliste1:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERTODAY1 where department_name = ?", [req.body.department_name]);
    },
    getVaktliste2:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERTODAY2 where department_name = ?", [req.body.department_name]);
    },
    getVaktliste3:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERTODAY3 where department_name = ?", [req.body.department_name]);
    },
    getPersonalShiftEvents : function (req, res) {
        dbHelper.getdbQuery(req, res, "select * from JSON_EMPLOYEE_VIEW where employee_id = ? And start >= CURDATE()", req.session.passport.user.id);
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

    get403 : function (req, res) {
        res.status(403).sendFile(path.join(__dirname + '/../views/403.html'));
    },
    //404 må være sist
    get404 : function (req, res) {
        res.status(404).sendFile(path.join(__dirname + '/../views/404.html'));
        //res.send('what???', 404);
    },


}
