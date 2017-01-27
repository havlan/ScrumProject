var dbMiddelware = require('../middlewares/dbQ1');
var db = require('../helpers/db');

module.exports = {
    //rest delete methods
    delLogin : function(req,res1){
        db.getdbQuery(req,res1,"delete from LoginInfo where employee_id = ? ",req.body.employee_id, function(err,res){
            if(err){
                res1.json(err);
            }else{
                res1.json(res);
            }
        });
    },
    delShift_has_employee : function (req, res) {
        db.getdbQuery(req,res,"delete from shift_has_employee where shift_id = ? and employee_id = ?",[req.body.shift_id,req.body.employee_id]);
    },
    delRequest_shift : function (req, res) {
        db.getdbQuery(req,res,"delete from Request_shift where Shift_shift_id = ?",req.body.shift_id);
    },
    delRequest : function (req, res) {
        db.getdbQuery(req,res,"delete from Request where request_id = ?",req.body.request_id);
    },
    delAbsence : function (req, res) {
        db.getdbQuery(req,res,"delete from Absence where absence_id = ?",req.body.absence_id);
    },
    delOvertime : function (req, res) {
        db.getdbQuery(req,res,"delete from Overtime where overtime_id = ?",req.body.overtime_id);
    }
}