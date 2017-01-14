var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./controllers/routes');
var session = require('express-session');
var passport = require('passport');



//var dbHelper = require('./helpers/db.js');
var getController = require('./controllers/getReq.js');


//use
//app.set('trust proxy',1);
app.use(session({
    secret: "p2p452818njajej488",
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*24*1000}
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
app.post('/slippmeginn',function(req,res,next){ // expire: 24t, sessionId: ahsdhelwleggogpg223311, is_admin: bool
    res.json({"Success":"MaBoii"});
    next();
});
app.get('/sessiontest',function(req,res,next){
    var sess = req.session;
    console.log("Session test");
    if(sess.views){
        sess.views++;
        res.json({"Views":sess.views});
    }else{
        sess.views = 1;
        res.json({"Views":sess.views});
        next();
    }
});

app.post('/hest',function(req,res){
    res.json({"Yeah":"MaBoii"});

});

var server = app.listen(3000, function(){
    console.log("Live at 3000");
});


//tests imports app
module.exports = server;
//other exports
module.exports = session;


//session tabell select ditt og datt fra cookietable where Date.now() < expires
/*
login -> sjekk -> hvis ok -> lagre cookie
logout -> cookie.clear()
 */