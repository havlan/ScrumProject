var dbMiddelware = require('../middlewares/dbQ1');
var session1;


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
    postAbsence : function (req,res) {
        dbMiddelware.postNewAbsence(req,res);
    },
    postOvertime : function (req, res) {
        dbMiddelware.postnewOvertime(req,res);
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
    updateLogInInfo : function (req, res) {
        dbMiddelware.updateLogInInfo(req,res);
    }
}