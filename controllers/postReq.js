var dbMiddelware = require('../middlewares/dbQ1');



module.exports = {
    postEmployee : function(req,res){
        dbMiddelware.postNewEmployee(req,res);
    }


}