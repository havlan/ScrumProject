//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
    //GET




    //POST/PUT
    postNewEmployee : function(req,res){
        var post = {name : req.body.name, phone_nr:req.body.phone_nr,email:req.body.email,seniority:req.body.seniority,
            username:req.body.username,address:req.body.address,type_name:req.body.type_name,responsibility_allowed:
            req.body.responsibility_allowed,password_hash:req.body.password_hash, password_salt:req.body.password_salt,
            pers_id:req.body.pers_id, total_hours:req.body.total_hours};
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
        dbHelper.postdbQuery(req,res,"insert into Shift set?", post);
    }


}
//heihei
