//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
        getUserInfo : function (req, res){
            dbHelper.dbQuery(req, res, "select * from NodeETest");
            //console.log(JSON.stringify(res));
        },
        getEmployeesWorking : function(req,res,datefrom,dateto){
            dbHelper.dbQuery(req,res,"SELECT e.Name, s.date, e.employee_id FROM Employee e, Shift s, shift_has_employee she WHERE e.employee_id = she.employee_id AND s.shift_id = she.shift_id AND s.date between"+datefrom+  "and"+dateto);
        }
}

