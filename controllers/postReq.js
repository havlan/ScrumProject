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
    }

}