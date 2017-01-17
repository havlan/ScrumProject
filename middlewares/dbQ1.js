//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
    //GET
    getEmployee : function(req,res){
        console.log("Overview Employee");
        dbHelper.getdbQuery(req,res, "select * from Employee");
    },
    getDepartment : function(req,res){
      //var get = {department_id:req.body.department_id};
      console.log("Overview Department");
      dbHelper.getdbQuery(req,res, "select * from Department where department_id = ?", req.params.department_id);
    },
    getType : function(req,res){
        console.log("Overview Type");
        dbHelper.getdbQuery(req,res, "select * from Type");
    },
    getShift : function(req,res){
        console.log("Overview Shift");
        dbHelper.getdbQuery(req,res, "select * from Shift");
    },
    getShift_has_employee : function(req,res){
        console.log("Overview Shift_has_employee");
        dbHelper.getdbQuery(req,res, "select * from shift_has_employee");
    },
    getRequest : function(req,res){
        console.log("Overview Request");
        dbHelper.getdbQuery(req,res, "select * from Request");
    },
    getAbsence : function(req,res){
        console.log("Overview Absence");
        dbHelper.getdbQuery(req,res, "select * from Absence");
    },
    getOvertime : function(req,res){
        dbHelper.getdbQuery(req,res, "select * from Overtime");
    },
    getSaltHash: function(req,res){
        dbHelper.getdbQuery(req,res, "select password_hash, password_salt, is_admin from LoginInfo where Username = ?",req.body.username);
    },
    getEmployeeOvertime : function (req,res) {
        dbHelper.dbQuery(req,res,"select * from Employee_Overtime");
    },
    getPersonalInfo : function (req, res) {
        dbHelper.dbQuery(req,res,"select * from Employee");
    },
    getEmployee_shifts_toCurrentDate : function(req,res){
        dbHelper.dbQuery(req,res,"select * from Employee_shifts_toCurrentDate where employee_id =?",req.params.employee_id);
    },


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

    //update
    //SYNTAKS
    //var pk = req.body.primarykey;
    //dbHelper.postdbQuery(req,res,"update TABLE set ? where PRIMARY KEY = ?",[{variabel : req.body.variabelnavn,.... },pk]);

    updateShift_has_employee : function (req, res) {
        var pk = req.body.shift_id;
        var pk2 = req.body.employee_id;
        dbHelper.postdbQuery(req,res,"update shift_has_employee set ? where employee_id = ? and shift_id = ?",[{avalibility:req.body.avalibility},pk,pk2]);
    },
    updateEmployee : function (req, res) {
        var id = req.body.employee_id;
        dbHelper.postdbQuery(req,res,"update Employee set ? where employee_id = ?",[{phone_nr : req.body.phone_nr, total_hours:req.body.total_hours,
            email:req.body.email, seniority : req.body.seniority, responsibility_allowed: req.body.responsibility_allowed, address: req.body.address, pers_id: req.body.pers_id}, id]);
    },
    updateType : function(req,res){
        var pk = req.body.name;
        dbHelper.postdbQuery(req,res,"update Type set ? where name = ?",[{rank:req.body.rank},pk]);
    },
    updateShift : function (req, res) {
        var pk = req.body.shift_id;
        dbHelper.postdbQuery(req,res,"update Shift set ? where shift_id = ?",[{minutes:req.body.minutes,date:req.body.date,department_id:req.body.department_id,type_name:req.body.type_name},pk]);
    },
    updateDepartment : function (req, res) {
        var pk = req.body.department_id;
        dbHelper.postdbQuery(req,res,"update Department set ? where department_id=?",[{department_name:req.body.department_name},pk]);
    },
    updateRequest : function (req, res) {
        var pk = request_id;
        dbHelper.postdbQuery(req,res,"update Request set ? where request_id =?",[{shift_id:req.body.shift_id,employee_id:req.body.employee_id,checked_by_admin:req.body.checked_by_admin},pk]);
    },
    updateAbsence : function (req, res) {
        var pk = req.body.absence_id;
        dbHelper.postdbQuery(req,res,"update Absence set ? where absence_id =?",[{checked_by_admin:req.body.checked_by_admin,shift_id:req.body.shift_id,employee_id:req.body.employee_id},pk]);
    },
    updateOvertime : function (req, res) {
        var pk = req.body.overtime_id;
        dbHelper.postdbQuery(req,res,"update Overtime set ? where overtime_id=?",[{checked_by_admin:req.body.checked_by_admin,shift_id:req.body.shift_id,employee_id:req.body.employee_id,overtime:req.body.overtime},pk]);
    },
    updateLogInInfo : function (req, res) {
        var pk = req.body.Username;
        dbHelper.postdbQuery(req,res,"update LoginInfo set ? where Username=?",[{is_admin:req.body.is_admin},pk]);
    }


}
//heihei