var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var postNyHest = 0;
var path = require('path');
var router = require('./controllers/routes');

//var dbHelper = require('./helpers/db.js');
var getController = require('./controllers/getReq.js');


//use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', router);


require("console-stamp")(console, {
    pattern:"dd/mm/yyyy HH:MM:ss.l",
    metadata:'[' + process.pid + ']',
    colors: {
        stamp : "yellow",
        label: "red",
        metadata: "green"
    }
});



//select * from NodeETest
//insert into NodeETest values ('42', 'Barbaren Dave')
//delete from NodeETest where id = '42'

/*app.get('/',function(req,res){
    //res.sendFile(path.join(__dirname + '/index.html'));
    console.log("GET ROOT");
    dbHelper.dbQuery(req, res, "delete from NodeETest where id = '42'");
});*/

app.post('/hest',function(req,res){
    console.log("POST '/hest' # " + ++postNyHest + " " + JSON.stringify(req.body));
    res.type('json');
    res.send("Success");
})

var server = app.listen(3000, function(){
    console.log("Live at 3000");
});


//tests import app
module.exports = server;