var dbHelper = require('../helpers/db');

module.exports = {
    //POST
    postEmployee : function(req,res){
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
        dbHelper.postdbQuery(req, res, "insert into Employee set ?", post);
    },
    postDepartment : function (req,res) {
        var post = {department_id: req.body.department_id, department_name: req.body.department_name};
        dbHelper.postdbQuery(req, res, "insert into Department set ?", post);
    },
    postType : function (req, res) {
        var post = {name: req.body.name, rank: req.body.rank};
        dbHelper.postdbQuery(req, res, "insert into Type set ?", post);
    },
    postShift : function (req, res) {
        var post = {
            shift_id: req.body.shift_id,
            minutes: req.body.minutes,
            date: req.body.date,
            department_id: req.body.department_id,
            type_name: req.body.type_name
        };
        dbHelper.postdbQuery(req, res, "insert into Shift set ?", post);
    },
    postShift_has_employee : function (req, res) {
        var post = {shift_id: req.body.shift_id, employee_id: req.body.employee_id};
        dbHelper.postdbQuery(req, res, "insert into shift_has_employee set ?", post);
    },
    postRequest : function (req, res) {
        var post = {
            shift_id: req.body.shift_id,
            employee_id: req.session.passport.user.id,
            explanation_request: req.body.explanation.request
        };
        dbHelper.postdbQuery(req, res, "insert into Request set ?", post);
    },
    postRequestShift : function (req, res) {
        var post = {
            Shift_shift_id: req.body.shift_id,
            Employee_employee_id: req.session.passport.user.id
        };
        dbHelper.postdbQuery(req, res, "insert into Request_shift set ? ", post);
    },
    postAbsence : function (req,res) {
        var post = {
            absence_id: req.body.absence_id,
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id
        };
        dbHelper.postdbQuery(req, res, "insert into Absence set ?", post);
    },
    postOvertime : function (req, res) {
        var post = {
            shift_id: req.body.shift_id,
            employee_id: req.session.passport.user.id,
            overtime: req.body.overtime,
            explanation_overtime: req.body.explanation
        };
        dbHelper.postdbQuery(req, res, "insert into Overtime set ?", post);
    },
    postLogInInfo : function (req, res) {
        var post = {
            username: req.body.username,
            password_hash: req.body.password_hash,
            password_salt: req.body.password_salt,
            employee_id: req.body.employee_id
        };
        dbHelper.postdbQuery(req, res, "insert into LogInInfo set ?", post);
    },
    postNewUser : function (req, res) {
        dbMiddelware.postnewUser(req,res);
    },
    //UPDATE
    updateShift_has_employee : function (req, res) {
        var pk = req.body.shift_id;
        var pk2 = req.body.employee_id;
        dbHelper.postdbQuery(req, res, "update shift_has_employee set ? where shift_id = ? and employee_id = ?", [{employee_id:req.body.employee_id2}, pk, pk2]);    },
    updateEmployee : function (req, res) {
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
    updateEmployeePersonalInfo : function (req, res) {
        dbHelper.postdbQuery(req,res,"update Employee set ? where employee_id = ?",[{
            phone_nr: req.body.phone_nr,
            email: req.body.email,
            address: req.body.address,},
            req.session.passport.user.id]);
    },
    updateType : function (req, res) {
        var pk = req.body.name;
        dbHelper.postdbQuery(req, res, "update Type set ? where name = ?", [{rank: req.body.rank}, pk]);
    },
    updateShift: function (req,res) {
        var pk = req.body.shift_id;
        dbHelper.postdbQuery(req, res, "update Shift set ? where shift_id = ?", [{
            minutes: req.body.minutes,
            date: req.body.date,
            department_id: req.body.department_id,
            type_name: req.body.type_name
        }, pk]);
    },
    updateDepartment : function (req, res) {
        var pk = req.body.department_id;
        dbHelper.postdbQuery(req, res, "update Department set ? where department_id=?", [{department_name: req.body.department_name}, pk]);
    },
    updateRequest : function (req, res) {
        var pk = req.body.request_id;
        dbHelper.postdbQuery(req, res, "update Request set ? where request_id =?", [{
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            checked_by_admin: req.body.checked_by_admin
        }, pk]);
    },
    updateAbsence : function (req, res) {
        var pk = req.body.absence_id;
        dbHelper.postdbQuery(req, res, "update Absence set ? where absence_id =?", [{
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            explanation_absence:req.body.explanation_absence
        }, pk]);
    },
    updateAbsence2 : function (req, res) {
        var pk = req.body.absence_id;
        dbHelper.postdbQuery(req, res, "update Absence set ? where absence_id =?", [{
            checked_by_admin: req.body.checked_by_admin
        }, pk]);
    },
    updateOvertime : function (req, res) {
        var pk = req.body.overtime_id;
        dbHelper.postdbQuery(req, res, "update Overtime set ? where overtime_id=?", [{
            checked_by_admin: req.body.checked_by_admin,
            shift_id: req.body.shift_id,
            employee_id: req.body.employee_id,
            overtime: req.body.overtime
        }, pk]);
    },
    updateOvertime2 : function (req, res) {
        var pk = req.body.overtime_id;
        dbHelper.postdbQuery(req, res, "update Overtime set ? where overtime_id=?", [{
            checked_by_admin: 1
        }, pk]);
    },
    updateRequest2 : function (req, res) {
        var pk = req.body.request_id;
        dbHelper.postdbQuery(req, res, "update Request set ? where request_id=?", [{
            checked_by_admin: req.body.checked_by_admin
        }, pk]);
    },
    updateLogInInfo : function (req, res) {
        var pk = req.body.username;
        dbHelper.postdbQuery(req, res, "update LoginInfo set ? where Username=?", [{is_admin: req.body.is_admin}, pk]);
    },
    insertBulkAvailability : function(req,res){ // får inn en array med json obj
        for(var i=0;i<req.body.availarray.length;i++){
            req.body.availarray[i][2] = req.session.passport.user.id;
        }
        dbHelper.postdbQuery(req,res,"replace into Availability (day, availability, employee_id) values ?", [req.body.availarray]); // insert into Availability (day,availability,employee_id) values ('2017-03-25 00:00:00', 1,1);
    }
}