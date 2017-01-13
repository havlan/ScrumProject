//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
    //GET
    getEmployee : function(req,res){
        var get = {phone_nr:req.body.phone_nr, total_hours:req.body.total_hours, employee_id:req.body.employee_id, email:req.body.email, seniority:req.body.seniority, responsibility_allowed:req.body.responsibility_allowed, type_name:req.body.type_name, name:req.body.name, address:req.body.address, pers_id:req.body.pers_id};
        console.log("Overview Employee");
        dbHelper.getdbQuery(req,res, "select * from Employee ?", get);
    },
    getDepartment : function(req,res){
      //var get = {department_id:req.body.department_id};
      console.log("Overview Department");
      dbHelper.getdbQuery(req,res, "select * from Department where department_id = ?", req.params.department_id);
    },
    getType : function(req,res){
        var get = {name:req.body.name, rank:req.body.rank};
        console.log("Overview Type");
        dbHelper.getdbQuery(req,res, "select * from Type ?", get);
    },
    getShift : function(req,res){
        var get = {skift_id:req.body.shift_id, minutes:req.body.minutes, date:req.body.date, department_id:req.body.department_id, type_name:req.body.type_name};
        console.log("Overview Shift");
        dbHelper.getdbQuery(req,res, "select * from Shift ?", get);
    },
    getShift_has_employee : function(req,res){
        var get = {shift_id:req.body.shift_id, employee_id:req.body.employee_id, availibility:req.body.availibility};
        console.log("Overview Shift_has_employee");
        dbHelper.getdbQuery(req,res, "select * from shift_has_employee ?", get);
    },
    getRequest : function(req,res){
        var get = {request_id:req.body.request_id, shift_id:req.body.shift_id, employee_id:req.body.employee_id, checked_by_admin:req.body.checked_by_admin};
        console.log("Overview Request");
        dbHelper.getdbQuery(req,res, "select * from Request ?", get);
    },
    getAbsence : function(req,res){
        var get = {absence_id:req.body.absence_id, checked_by_admin:req.body.checked_by_admin, shift_id:req.body.shift_id, employee_id:req.body.employee_id};
        console.log("Overview Absence");
        dbHelper.getdbQuery(req,res, "select * from Absence ?", get);
    },
    getOvertime : function(req,res){
        var get = {overtime_id:req.body.overtime_id, checked_by_admin:req.body.checked_by_admin, shift_id:req.body.shift_id, employee_id:req.body.employee_id, overtime:req.body.overtime};
        console.log("Overview Overtime");
        dbHelper.getdbQuery(req,res, "select * from Overtime ?", get);
    },
    /**
    getVaktoversikt : function(req,res){
        var get = {name:req.body.name, type:req.body.type, department:req.body.department, responsibility_allowed:req.body.type, phone_nr:req.body.phone_nr};
        console.log("Overview worklist");
        dbHelper.getdbQuery(req,res, "overview shifts ?", get);
    },
*/

    //POST/PUT
    postNewEmployee : function(req,res){
        var post = {name : req.body.name, phone_nr:req.body.phone_nr,email:req.body.email,seniority:req.body.seniority,
            username:req.body.username,address:req.body.address,type_name:req.body.type_name,responsibility_allowed:
            req.body.responsibility_allowed,pers_id:req.body.pers_id, total_hours:req.body.total_hours};
        console.log("Posting new Employee");
        dbHelper.postdbQuery(req,res, "insert into Employee set ?", post);
    },
    postNewDepartment : function (req, res) {
        var post = {department_id: req.body.department_id, department_name: req.body.department_name};
        console.log("Posting new Department");
        dbHelper.postdbQuery(req, res, "insert into Department set ?", post);
    },
    postNewType : function (req, res) {
        var post = {name:req.body.name,rank:req.body.rank};
        console.log("Posting new Type");
        dbHelper.postdbQuery(req,res,"insert into Type set ?", post);
    },
    postNewShift : function (req, res) {
        var post = {shift_id:req.body.shift_id, minutes:req.body.minutes, date:req.body.date, department_id:req.body.department_id,type_name:req.body.type_name};
        console.log("Posting new Shift");
        dbHelper.postdbQuery(req,res,"insert into Shift set ?", post);
    },
    postNewShift_has_employee : function (req, res) {
        var post = {shift_id:req.body.shift_id,employee_id:req.body.employee_id,avalibility:req.body.avalibility};
        console.log("Posting new shift_has_employee");
        dbHelper.postdbQuery(req,res,"insert into shift_has_employee set ?",post);
    },
    postNewRequest : function (req, res) {
        var post = {request_id:req.body.request_id,shift_id:req.body.shift_id,employee_id:req.body.employee_id,checked_by_admin:req.body.checked_by_admin};
        console.log("Posting new request");
        dbHelper.postdbQuery(req,res,"insert into Request set ?",post);
    },
    postNewAbsence : function (req, res) {
        var post ={absence_id:req.body.absence_id,checked_by_admin:req.body.checked_by_admin,shift_id:req.body.shift_id,employee_id:req.body.employee_id};
        console.log("Posting new absence");
        dbHelper.postdbQuery(req,res,"insert into Absence set ?",post);
    },
    postnewOvertime : function (req, res) {
        var post = {overtime_id:req.body.overtime_id,checked_by_admin:req.body.checked_by_admin,shift_id:req.body.shift_id,employee_id:req.body.employee_id,overtime:req.body.overtime};
        console.log("Posting new overtime");
        dbHelper.postdbQuery(req,res,"insert into Overtime set ?",post);
    },
    postnewLogInInfo : function (req, res) {
        var post = {username:req.body.username,password_hash:req.body.password_hash,password_salt:req.body.password_salt,employee_id:req.body.employee_id};
        console.log("Posting new LogInInfo");
        dbHelper.postdbQuery(req,res,"insert into LogInInfo set ?",post);
    },
    getEmployeeOvertime : function (req,res) {
        dbHelper.dbQuery(req,res,"select * from Employee_Overtime");
    },
    getPersonalInfo : function (req, res) {
        dbHelper.dbQuery(req,res,"select * from Employee where employee_id employee_id=1");
    }
}
//heihei
