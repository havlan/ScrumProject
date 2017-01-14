var dbMiddelware = require('../middlewares/dbQ1');



module.exports = {
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
    updateShift_has_employee : function (req, res) {
        dbMiddelware.updateShift_has_employee(req,res);
    },
    updateEmployee : function (req, res) {
        dbMiddelware.updateEmployee(req,res);
    }
}