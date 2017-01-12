//this file executes test-queries towards mysql

var dbHelper = require('../helpers/db');

module.exports = {
    getNodeETest : function (req, res){
        dbHelper.dbQuery(req, res, "select * from NodeETest");
        console.log("NodeETest GET");
        //console.log(JSON.stringify(res));
    },
    putNodeETest : function(req,res){
        dbHelper.dbQuery(req,res, "UPDATE NodeETest set notat = 'sjøhezt er bezt' where id = 10;");
        console.log("NodeETest PUT");
    },
    postNodeETest : function(req,res){
        var post = {notat : req.body.notat};
        console.log(post);
        dbHelper.postdbQuery(req,res, "insert into NodeETest set ?", post);
    }
}

