var path = require('path');
var bodyParser = require('body-parser');
var dbHelper = require('../helpers/db');
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
        res.sendFile(path.join(__dirname + '/../views/shiftOverview.html'));
    },
    getCalendarSite : function (req, res){
        res.sendFile(path.join(__dirname + '/../views/frontpageEmp.html'));
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

    //DB resources
    getEmployee : function (req, res){
        dbHelper.getdbQuery(req, res, "select phone_nr as Tlf,total_hours as Timer, employee_id as AnsattID,email as Epost,seniority as Stillingsprosent,responsibility_allowed as Ansvarsvakt, type_name as Stilling, name as Navn, address as Adresse, pers_id as PersNr from Employee");
    },
    getEmployee2 : function (req, res) {
        dbHelper.getdbQuery(req,res,"select name from Employee");
    },
    getOneEmployee : function(req,res){
        dbHelper.getdbQuery(req, res, "select * from Employee where employee_id = ?",req.session.passport.user.id);
    },
    getEmployeeRestricted : function (req, res) {
        dbHelper.getdbQuery(req,res,"select employee_id as ID,name as Navn,phone_nr as Tlf,email as Epost,type_name as Stilling from Employee");
    },
    getAbsenceView : function (req, res) {
        dbHelper.getdbQuery(req,res,"select a.absence_id as Nr, e.employee_id as AnsattID, e.name as Navn,s.shift_id as Skift,s.date as Dato,a.explanation_absence as Årsak,d.department_name as Avdeling from Employee e,Shift s,shift_has_employee she,Absence a,Department d where e.employee_id = she.employee_id and s.shift_id = she.shift_id and a.shift_id = she.shift_id and s.department_id = d.department_id and a.checked_by_admin = 0 group by a.absence_id order by a.absence_id");
    },
    getOvertimeView : function (req, res) {
        dbHelper.getdbQuery(req,res,"select o.overtime_id as Nr, e.employee_id as AnsattID, e.name as Navn,s.shift_id as Skift,s.date as Dato,o.overtime as Timer, o.explanation_overtime as Årsak,d.department_name as Avdeling from Employee e,Shift s,shift_has_employee she,Overtime o,Department d where e.employee_id = she.employee_id and s.shift_id = she.shift_id and o.shift_id = she.shift_id and s.department_id = d.department_id and o.checked_by_admin = 0 group by o.overtime_id order by d.department_id, s.date");
    },
    getRequestView : function (req, res) {
        dbHelper.getdbQuery(req,res,"select r.shift_id as Skift, e.employee_id as AnsattID, e.name as Navn,s.shift_id as Skift,s.date as Dato, r.explanation_request as Årsak,d.department_name as Avdeling from Employee e,Shift s,shift_has_employee she,Request r,Department d where e.employee_id = she.employee_id and s.shift_id = she.shift_id and r.shift_id = she.shift_id and s.department_id = d.department_id group by r.request_id order by r.request_id");
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
        dbHelper.getdbQuery(req, res, "select employee_id as AnsattID,name as Navn,date as Dato,type_name as Stilling,responsibility_allowed as Ansvarsvakt from Employee_Shifts_toCurrentDate where employee_id = ?",[req.session.passport.user.id]);
    },
    getEmployee_Shifts_fromCurrentDate:function(req,res){
        dbHelper.getdbQuery(req, res, "select e.employee_id as AnsattID,e.name as Navn, e.date as Dato,e.shift_id as Skift,e.type_name as Stilling,e.responsibility_allowed as Ansvarsvakt from Employee_Shifts_fromCurrentDate e where e.employee_id = ?",[req.session.passport.user.id]);
    },
    getEmployee_Shifts_fromCurrentDate2:function(req,res){
        dbHelper.getdbQuery(req, res, "select e.employee_id as AnsattID,e.name as Navn, e.date as Dato,e.shift_id as Skift,e.type_name as Stilling,e.responsibility_allowed as Ansvarsvakt from Employee_Shifts_fromCurrentDate e where e.shift_id not in(select r.shift_id from Request r) and e.employee_id = ?",[req.session.passport.user.id]);
    },
    getLoginInfoEmployee : function (req, res) {
        dbHelper.getdbQuery(req,res,"select * from LoginInfo where employee_id = ?",req.params.id);
    },
    getVaktliste1:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERDAY1 where department_name = ? and DATE(date) = ?", [req.body.department_name,req.body.date]);
    },
    getVaktliste2:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERDAY2 where department_name = ? and DATE(date) = ?", [req.body.department_name,req.body.date]);
    },
    getVaktliste3:function(req,res){
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERDAY3 where department_name = ? and DATE(date) = ?", [req.body.department_name,req.body.date]);
    },
    getPersonalShiftEvents : function (req, res) {
        dbHelper.getdbQuery(req, res, "select end, start, id, title,description,phone_nr from JSON_EMPLOYEE_VIEW where employee_id = ? And start >= NOW()", req.session.passport.user.id);
    },
    getTypeNames : function (req, res) {
        dbHelper.getdbQuery(req,res,"Select name from Type");
    },
    getNextShiftForEmp : function (req, res) {
        dbHelper.getdbQuery(req,res,"Select DATE_FORMAT(MIN(s.date), '%m/%d/%Y %H:%i') as ndate, e.employee_id, d.department_name From Employee e, shift_has_employee she, Shift s, Department d Where s.date > now() And e.employee_id = she.employee_id And she.shift_id = s.shift_id And s.department_id = d.department_id and e.employee_id = ?", [req.session.passport.user.id]);
    },

    getAvailability : function (req, res) {
        dbHelper.getdbQuery(req, res, "Select day, availability From Availability Where employee_id = ?",req.session.passport.user.id);
    },
    getShiftChange : function (req, res){
        dbHelper.getdbQuery(req, res, "select * from WORKSHIFTTOGETHER");
    },

    getAvailableEmpForShift : function (req, res) {
        dbHelper.getdbQuery(req, res, "SELECT e.employee_id, e.name FROM Employee e, Shift s WHERE (SELECT rank FROM Type t WHERE t.name = s.type_name)<=(SELECT rank FROM Type t WHERE t.name = e.type_name) AND s.date NOT IN(SELECT a.day FROM Availability a WHERE a.employee_id = e.employee_id AND availability = 1) AND s.date NOT IN(SELECT date FROM Shift ss, shift_has_employee she WHERE ss.shift_id = she.shift_id AND she.employee_id = e.employee_id) AND s.shift_id = ?", [req.params.id]);
    },
    getRequestShift : function (req, res) {
        dbHelper.getdbQuery(req,res,"select e.employee_id, e.name from Employee e, Request_shift rs where e.employee_id = rs.Employee_employee_id and rs.Shift_shift_id = ?",[req.params.id])
    },
    getAvailableShifts : function (req, res) {
        dbHelper.getdbQuery(req, res, "select count(*) as total From available_shift");
    },
    getClearenceLevel : function (req, res) {
        res.json(req.session.passport.user.is_admin);
    },
    getAbsenceNum : function (req, res) {
        dbHelper.getdbQuery(req, res, "select count(*) as total From Absence Where checked_by_admin=0");
    },
    getOvertimeNum : function (req, res) {
        dbHelper.getdbQuery(req, res, "select count(*) as total From Overtime Where checked_by_admin=0");
    },
    getChangeNum : function (req, res) {
        dbHelper.getdbQuery(req, res, "select count(*) as total From Request Where checked_by_admin=0");
    },
    getEmpForShiftDate : function (req,res) {
        dbHelper.getdbQuery(req,res, "SELECT ase.employee_id, ase.emp_name FROM available_shift_emp ase Where ase.id = ? AND ase.title = ?", [req.body.shift_id, req.body.type_name]);
    },
    getEmpForShiftDateAll : function (req,res) {
        dbHelper.getdbQuery(req,res, "SELECT ase.employee_id, ase.name FROM available_emp_for_shift ase Where ase.id = ?", [req.body.shift_id]);
    },
    getPersonalShiftEventsDone : function (req,res) {
        dbHelper.getdbQuery(req, res, "select end, start, id, title,description,email from JSON_EMPLOYEE_VIEW where employee_id = ? And start < NOW()", req.session.passport.user.id);
    },
    getPossibleShiftsEvents : function(req,res){ // WHAT DOES THIS DO
        dbHelper.getdbQuery(req,res,"select end, start, id, title,description from available_emp_for_shift where employee_id = ?", req.session.passport.user.id);
    },
    getAvailableEmpForDate : function (req,res) {
        dbMiddelware.getAvailableEmpForDate(req,res);
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
