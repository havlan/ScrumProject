//this file executes queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
        getNodeETest : function (req, res){
            dbHelper.dbQuery(req, res, "select * from NodeETest");
            //console.log(JSON.stringify(res));
        },
        putNodeETest : function(req,res){
            dbHelper.dbQuery(req,res, "INSERT INTO NodeETest VALUES (default, 'hest');");
        }
}

