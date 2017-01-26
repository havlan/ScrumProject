//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
    //GET
    getEmployee: function (req, res) {
        console.log("Overview Employee");
        dbHelper.getdbQuery(req, res, "select phone_nr as Tlf,total_hours as Timer, employee_id as AnsattID,email as Epost,seniority as Stillingsprosent,responsibility_allowed as Ansvarsvakt, type_name as Stilling, name as Navn, address as Adresse, pers_id as PersNr from Employee");
    },
    getEmployee2: function (req, res) {
        console.log("Overview Employee2");
        dbHelper.getdbQuery(req,res,"select name from Employee");
    },
    getOneEmployee: function (req, res) {
        console.log("Overview Employee");
        dbHelper.getdbQuery(req, res, "select * from Employee where employee_id = ?",req.session.passport.user.id);
    },
    getEmployeeRestricted : function (req, res) {
        console.log("Overview Employee restricted");
        dbHelper.getdbQuery(req,res,"select employee_id as ID,name as Navn,phone_nr as Tlf,email as Epost,type_name as Stilling from Employee");
    },
    getDepartment: function (req, res) {
        //var get = {department_id:req.body.department_id};
        console.log("Overview Department");
        dbHelper.getdbQuery(req, res, "select * from Department"); // where department_id = ?",req.body.department_id);
    },
    getType: function (req, res) {
        console.log("Overview Type");
        dbHelper.getdbQuery(req, res, "select * from Type");
    },
    getShift: function (req, res) {
        console.log("Overview Shift");
        dbHelper.getdbQuery(req, res, "select * from Shift");
    },
    getShift_has_employee: function (req, res) {
        console.log("Overview Shift_has_employee");
        dbHelper.getdbQuery(req, res, "select * from shift_has_employee");
    },
    getRequest: function (req, res) {
        console.log("Overview Request");
        dbHelper.getdbQuery(req, res, "select * from Request");
    },
    getAbsence: function (req, res) {
        console.log("Overview Absence");
        dbHelper.getdbQuery(req, res, "select * from Absence");
    },
    getOvertime: function (req, res) {
        dbHelper.getdbQuery(req, res, "select * from Overtime");
    },
    getAbsenceView : function (req, res) {
        dbHelper.getdbQuery(req,res,"select a.absence_id as Nr, e.employee_id as AnsattID, e.name as Navn,s.shift_id as Skift,s.date as Dato,a.explanation_absence as Årsak,d.department_name as Avdeling from Employee e,Shift s,shift_has_employee she,Absence a,Department d where e.employee_id = she.employee_id and s.shift_id = she.shift_id and a.shift_id = she.shift_id and s.department_id = d.department_id and a.checked_by_admin = 0 group by a.absence_id order by d.department_id, s.date");
    },
    getOvertimeView : function (req, res) {
        dbHelper.getdbQuery(req,res,"select o.overtime_id as Nr, e.employee_id as AnsattID, e.name as Navn,s.shift_id as Skift,s.date as Dato,o.overtime as Timer, o.explanation_overtime as Årsak,d.department_name as Avdeling from Employee e,Shift s,shift_has_employee she,Overtime o,Department d where e.employee_id = she.employee_id and s.shift_id = she.shift_id and o.shift_id = she.shift_id and s.department_id = d.department_id and o.checked_by_admin = 0 group by o.overtime_id order by d.department_id, s.date");
    },
    getRequestView : function (req, res) {
        dbHelper.getdbQuery(req,res,"select r.request_id as Nr, e.employee_id as AnsattID, e.name as Navn,s.shift_id as Skift,s.date as Dato, r.explanation_request as Årsak,d.department_name as Avdeling from Employee e,Shift s,shift_has_employee she,Request r,Department d where e.employee_id = she.employee_id and s.shift_id = she.shift_id and r.shift_id = she.shift_id and s.department_id = d.department_id and r.checked_by_admin = 0 group by r.request_id order by r.request_id");
    },
    getSaltHash: function (req, res) {
        dbHelper.getdbQuery(req, res, "select password_hash, password_salt, is_admin from LoginInfo where Username = ?", req.body.username);
    },
    getSaltHash: function(req,res,next){
        dbHelper.getdbQWNext(req,res, "select password_hash, password_salt, is_admin from LoginInfo where Username = ?",[req.body.username],next);
    },
    getEmployee_Shifts_toCurrentDate: function (req, res) {
        console.log("USER ID "+req.session.passport.user.id);
        dbHelper.getdbQuery(req, res, "select * from Employee_Shifts_toCurrentDate where employee_id = ?",[req.session.passport.user.id]);
    },
    getEmployee_Shifts_fromCurrentDate: function (req, res) {
        console.log("USER ID "+req.session.passport.user.id);
        dbHelper.getdbQuery(req, res, "select e.employee_id as AnsattID,e.name as Navn, e.date as Dato,e.shift_id as Skift,e.type_name as Stilling,e.responsibility_allowed as Ansvarsvakt from Employee_Shifts_fromCurrentDate e where e.employee_id = ?",[req.session.passport.user.id]);
    },
    getPersonalShiftEvents : function (req, res) {
        dbHelper.getdbQuery(req, res, "select * from JSON_EMPLOYEE_VIEW where employee_id = ? And start >= CURDATE()", req.session.passport.user.id);
    },
    getPossibleSiftsEvents : function (req, res) {
        console.log("USER ID "+req.session.passport.user.id);
        dbHelper.getdbQuery(req,res,"select end, start, id, title from available_emp_for_shift where employee_id = ?", req.session.passport.user.id);
    }
        ,
    /*simpleLogin : function(username){
        dbHelper.simpleLogin("select * from LoginInfo where Username = ?", [username]);
    },*/
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

    getAvailableEmpForShift : function (req, res){
        dbHelper.getdbQuery(req, res, "SELECT e.employee_id, e.name FROM Employee e, Shift s WHERE (SELECT rank FROM Type t WHERE t.name = s.type_name)<=(SELECT rank FROM Type t WHERE t.name = e.type_name) AND s.date NOT IN(SELECT a.day FROM Availability a WHERE a.employee_id = e.employee_id AND availability = 1) AND s.date NOT IN(SELECT date FROM Shift ss, shift_has_employee she WHERE ss.shift_id = she.shift_id AND she.employee_id = e.employee_id) AND s.shift_id = ?", [req.body.shift_id]);
    },
    getAvailableShifts : function (req, res){
        dbHelper.getdbQuery(req, res, "select count(*) as total From available_shift");
    },
    getAbsenceNum : function (req, res){
        dbHelper.getdbQuery(req, res, "select count(*) as total From Absence Where checked_by_admin=0");
    },
    getOvertimeNum : function (req, res){
        dbHelper.getdbQuery(req, res, "select count(*) as total From Overtime Where checked_by_admin=0");
    },
    getChangeNum : function (req, res){
        dbHelper.getdbQuery(req, res, "select count(*) as total From Request Where checked_by_admin=0");
    },
    getEmpForShiftDate : function (req,res) {
        dbHelper.getdbQuery(req,res, "SELECT ase.employee_id, ase.emp_name FROM available_shift_emp ase Where ase.id = ? AND ase.title = ?", [req.body.shift_id, req.body.type_name]);
    },


    //POST/PUT


    postNewEmployee: function (req, res) {
        var post = {
            name: req.body.name,
            phone_nr: req.body.phone_nr,
            email: req.body.email,
            seniority: req.body.seniority,
            address: req.body.address,
            type_name: req.body.type_name,
            responsibility_allowed: req.body.responsibility_allowed,
            pers_id: req.body.pers_id,
            total_hours: req.body.total_hours
        };
        console.log("Posting new Employee");
        dbHelper.postdbQuery(req, res, "insert into Employee set ?", post);
    },
    postNewDepartment: function (req, res) {
        var post = {department_id: req.body.department_id, department_name: req.body.department_name};
        console.log("Posting new Department");
        dbHelper.postdbQuery(req, res, "insert into Department set ?", post);
    },
    postNewType: function (req, res) {
        var post = {name: req.body.name, rank: req.body.rank};
        console.log("Posting new Type");
        dbHelper.postdbQuery(req, res, "insert into Type set ?", post);
    },
    postNewShift: function (req, res) {
        var post = {
            shift_id: req.body.shift_id,
            minutes: req.body.minutes,
            date: req.body.date,
            department_id: req.body.department_id,
            type_name: req.body.type_name
        };
        console.log("Posting new Shift");
        dbHelper.postdbQuery(req, res, "insert into Shift set ?", post);
    },
    postNewShift_has_employee: function (req, res) {
        var post = {shift_id: req.body.shift_id, employee_id: req.body.employee_id, avalibility: req.body.avalibility};
        console.log("Posting new shift_has_employee");
        dbHelper.postdbQuery(req, res, "insert into shift_has_employee set ?", post);
    },
    postNewRequest: function (req, res) {
        var post = {
            shift_id: req.body.shift_id,
            employee_id: req.session.passport.user.id,
            checked_by_admin: req.body.checked_by_admin
        };
        console.log("Posting new request");
        dbHelper.postdbQuery(req, res, "insert into Request set ?", post);
    },
    postNewAbsence: function (req, res) {
        var post = {
            absence_id: req.body.absence_id,
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id
        };
        console.log("Posting new absence");
        dbHelper.postdbQuery(req, res, "insert into Absence set ?", post);
    },
    postnewOvertime: function (req, res) {
        var post = {
            overtime_id: req.body.overtime_id,
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            overtime: req.body.overtime,
            explanation: req.body.explanation
        };
        console.log("Posting new overtime");
        dbHelper.postdbQuery(req, res, "insert into Overtime set ?", post);
    },
    postnewLogInInfo: function (req, res) {
        var post = {
            username: req.body.username,
            password_hash: req.body.password_hash,
            password_salt: req.body.password_salt,
            employee_id: req.body.employee_id
        };
        console.log("Posting new LogInInfo");
        dbHelper.postdbQuery(req, res, "insert into LogInInfo set ?", post);
    },
    getVaktliste1: function (req,res) {
        console.log("Posting new Departments");
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERDAY1 where department_name = ? and DATE(date) = ?", [req.body.department_name,req.body.date]);
    },
    getVaktliste2: function (req,res) {
        console.log("Posting new Departments");
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERDAY2 where department_name = ? and DATE(date) = ?", [req.body.department_name,req.body.date]);
    },
    getVaktliste3: function (req,res) {
        console.log("Posting new Departments");
        dbHelper.getdbQuery(req, res, "select * from WORKTOGETHERDAY3 where department_name = ? and DATE(date) = ?", [req.body.department_name,req.body.date]);
    },

    /*
    postShiftChange: function (req,res){
        console.log("Posting new ShiftChange");
        dbHelper.postdbQuery(req, res, "insert into Request (request_id, shift-id, employee_id, checked_by_admin) select null, r4.shift_id, r4.employee_id, null from ready_shift_change_rank4, Request r where r.employee_id = r4.employee_id order by r4.shift_id");
    },
    */
    //update
    //SYNTAKS
    //var pk = req.body.primarykey;
    //dbHelper.postdbQuery(req,res,"update TABLE set ? where PRIMARY KEY = ?",[{variabel : req.body.variabelnavn,.... },pk]);

    updateShift_has_employee: function (req, res) {
        var pk = req.body.shift_id;
        var pk2 = req.body.employee_id;
        dbHelper.postdbQuery(req, res, "update shift_has_employee set ? where shift_id = ? and employee_id = ?", [{employee_id:req.body.employee_id2}, pk, pk2]);
    },
    updateEmployee: function (req, res) {
        dbHelper.postdbQuery(req, res, "update Employee set ? where employee_id = ?", [{
            name:req.body.name,
            type_name:req.body.type_name,
            phone_nr: req.body.phone_nr,
            total_hours: req.body.total_hours,
            email: req.body.email,
            seniority: req.body.seniority,
            responsibility_allowed: req.body.responsibility_allowed,
            address: req.body.address,
            pers_id: req.body.pers_id
        }, req.body.employee_id]);
    },
    updateEmployeePersonalInfo: function (req, res) {
        dbHelper.postdbQuery(req,res,"update Employee set ? where employee_id = ?",[{
            phone_nr: req.body.phone_nr,
            email: req.body.email,
            address: req.body.address,},
            req.session.passport.user.id])
    },
    updateType: function (req, res) {
        var pk = req.body.name;
        dbHelper.postdbQuery(req, res, "update Type set ? where name = ?", [{rank: req.body.rank}, pk]);
    },
    updateShift: function (req, res) {
        var pk = req.body.shift_id;
        dbHelper.postdbQuery(req, res, "update Shift set ? where shift_id = ?", [{
            minutes: req.body.minutes,
            date: req.body.date,
            department_id: req.body.department_id,
            type_name: req.body.type_name
        }, pk]);
    },
    updateDepartment: function (req, res) {
        var pk = req.body.department_id;
        dbHelper.postdbQuery(req, res, "update Department set ? where department_id=?", [{department_name: req.body.department_name}, pk]);
    },
    updateRequest: function (req, res) {
        var pk = req.body.request_id;
        dbHelper.postdbQuery(req, res, "update Request set ? where request_id =?", [{
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            checked_by_admin: req.body.checked_by_admin
        }, pk]);
    },
    updateAbsence: function (req, res) {
        var pk = req.body.absence_id;
        dbHelper.postdbQuery(req, res, "update Absence set ? where absence_id =?", [{
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            explanation_absence:req.body.explanation_absence
        }, pk]);
    },
    updateAbsence2: function (req, res) {
        var pk = req.body.absence_id;
        dbHelper.postdbQuery(req, res, "update Absence set ? where absence_id =?", [{
            checked_by_admin: req.body.checked_by_admin
        }, pk]);
    },
    updateOvertime: function (req, res) {
        var pk = req.body.overtime_id;
        dbHelper.postdbQuery(req, res, "update Overtime set ? where overtime_id=?", [{
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            overtime: req.body.overtime
        }, pk]);
    },
    updateOvertime2: function (req, res) {
        var pk = req.body.overtime_id;
        dbHelper.postdbQuery(req, res, "update Overtime set ? where overtime_id=?", [{
            checked_by_admin: req.body.checked_by_admin,
        }, pk]);
    },
    updateRequest2: function (req, res) {
        var pk = req.body.request_id;
        dbHelper.postdbQuery(req, res, "update Request set ? where request_id=?", [{
            checked_by_admin: req.body.checked_by_admin,
        }, pk]);
    },
    updateLogInInfo: function (req, res) {
        var pk = req.body.username;
        dbHelper.postdbQuery(req, res, "update LoginInfo set ? where Username=?", [{is_admin: req.body.is_admin}, pk]);
    },


};
//heihei
