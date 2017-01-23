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
    }
}