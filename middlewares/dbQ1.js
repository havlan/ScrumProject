//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
        getUserInfo : function (req, res){
            dbHelper.dbQuery(req, res, "select * from NodeETest");
            //console.log(JSON.stringify(res));
        }
}

