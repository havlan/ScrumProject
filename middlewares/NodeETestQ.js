//this file executes test-queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
    getNodeETest : function (req, res){
        dbHelper.dbQuery(req, res, "select * from NodeETest");
    },
    putNodeETest : function(req,res){
        dbHelper.dbQuery(req,res, "UPDATE NodeETest set notat = 'sjøhezt er bezt' where id = 10;");
        console.log("NodeETest PUT");
    },
    postNodeETest : function(req,res){
        dbHelper.dbQuery(req,res, "insert into NodeETest values (default, 'dvergponni');");
        console.log("NodeETest POST");
    }
}

