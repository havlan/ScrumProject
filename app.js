var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var postNyHest = 0;
var path = require('path');
var router = require('./controllers/routes');
var session = require('express-session');
var passport = require('passport');



//var dbHelper = require('./helpers/db.js');
var getController = require('./controllers/getReq.js');


//use
//app.set('trust proxy',1);
app.use(session({
    secret: "horse",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static (__dirname + '/public'));
app.use('/', router);


if(process.env.NODE_ENV !== 'test'){
    require("console-stamp")(console, {
        pattern:"dd/mm/yyyy HH:MM:ss.l",
        metadata:'[' + process.pid + ']',
        colors: {
            stamp : "yellow",
            label: "red",
            metadata: "green"
        }
    });
}



//select * from NodeETest
//insert into NodeETest values ('42', 'Barbaren Dave')
//delete from NodeETest where id = '42'
var sess;
app.post('/slippmeginn',function(req,res){
    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;
    console.log("Sess ID #"+ sess.sessionID + "\n" + sess.username + ", " + sess.password);
    res.json({"Yeah":"MaBoii"});
});

app.post('/hest',function(req,res){
    res.json({"Yeah":"MaBoii"});

})

var server = app.listen(3000, function(){
    console.log("Live at 3000");
});


//tests imports app
module.exports = server;
//other exports
module.exports = session;