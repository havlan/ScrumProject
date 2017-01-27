var dbMiddelware = require('../middlewares/dbQ1');
var dbMethods = require('../helpers/db');

module.exports = {
    //POST
    postEmployee : function(req,res){
        dbMiddelware.postNewEmployee(req,res);
    },
    postDepartment : function (req,res) {
        dbMiddelware.postNewDepartment(req, res);
    },
    postType : function (req, res) {
        dbMiddelware.postNewType(req,res);
    },
    postShift : function (req, res) {
        dbMiddelware.postNewShift(req,res);
    },
    postShift_has_employee : function (req, res) {
        dbMiddelware.postNewShift_has_employee(req,res);
    },
    postRequest : function (req, res) {
        dbMiddelware.postNewRequest(req,res);
    },
    postRequestShift : function (req, res) {
        dbMiddelware.postNewRequestShift(req,res);
    },
    postAbsence : function (req,res) {
        dbMiddelware.postNewAbsence(req,res);
    },
    postOvertime : function (req, res) {
        dbMiddelware.postnewOvertime2(req,res);
    },
    postLogInInfo : function (req, res) {
        dbMiddelware.postnewLogInInfo(req,res);
    },
    postNewUser : function (req, res) {
        dbMiddelware.postnewUser(req,res);
    },
    //UPDATE
    updateShift_has_employee : function (req, res) {
        dbMiddelware.updateShift_has_employee(req,res);
    },
    updateEmployee : function (req, res) {
        dbMiddelware.updateEmployee(req,res);
    },
    updateEmployeePersonalInfo : function (req, res) {
        dbMiddelware.updateEmployeePersonalInfo(req,res);
    },
    updateType : function (req, res) {
        dbMiddelware.updateType(req,res);
    },
    updateShift: function (req,res) {
        dbMiddelware.updateShift(req,res);
    },
    updateDepartment : function (req, res) {
        dbMiddelware.updateDepartment(req,res);
    },
    updateRequest : function (req, res) {
        dbMiddelware.updateRequest(req,res);
    },
    updateAbsence : function (req, res) {
        dbMiddelware.updateAbsence(req,res);
    },
    updateAbsence2 : function (req, res) {
        dbMiddelware.updateAbsence2(req,res);
    },
    updateOvertime : function (req, res) {
        dbMiddelware.updateOvertime(req,res);
    },
    updateOvertime2 : function (req, res) {
        dbMiddelware.updateOvertime2(req,res);
    },
    updateRequest2 : function (req, res) {
        dbMiddelware.updateRequest2(req,res);
    },
    updateLogInInfo : function (req, res) {
        dbMiddelware.updateLogInInfo(req,res);
    },
    insertBulkAvailability : function(req,res){ // får inn en array med json obj
        for(var i=0;i<req.body.availarray.length;i++){
            req.body.availarray[i][2] = req.session.passport.user.id;
            console.log(req.body.availarray[i]);
        }

        dbMethods.postdbQuery(req,res,"insert into Availability (day, availability, employee_id) values ?", [req.body.availarray]); // insert into Availability (day,availability,employee_id) values ('2017-03-25 00:00:00', 1,1);
    }
}