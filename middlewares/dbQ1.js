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
    }


}
//heihei
