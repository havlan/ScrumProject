var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./controllers/routes');
var session = require('express-session');
var expressValidator = require('express-validator')
var passport = require('passport');
var hbs = require('express-handlebars');
var FileStore = require('session-file-store')(session);
var auth = require('./middlewares/authenticate');
var auth2 = require('./middlewares/authenicate2');



//var dbHelper = require('./helpers/db.js');
var getController = require('./controllers/getReq.js');


//use
//app.set('trust proxy',1);
app.engine('hbs', hbs({extname : 'hbs', layoutsDir: __dirname + '/public/css'}));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine','hbs');

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static (__dirname + '/public'));
app.use(expressValidator());
app.use(session({
    secret: "hest",
    store: new FileStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*24*1000*3
    }
}));

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
//sessions are stored on the server, the client only stores session id
app.post('/slippmeginn',function(req,res,next){ // expire: 24t, sessionId: ahsdhelwleggogpg223311, is_admin: bool
    if(req.session && req.session.is_admin === true && req.session.username === "Abigail"){ // sjekk det du må
        console.log("ADMIN LOGIN");
    }else{ // sjekk vanlig login
        console.log("No session data exists");
        req.session.username = req.body.username;
        req.session.is_admin = true;
    }
    next();

});
app.get('/home',function(req,res){
    if(typeof req.session.success == 'undefined') { // checks if session already exists
        req.session.success = false;
    }
    if(typeof req.session.is_admin == 'undefined'){
        req.session.is_admin = false;
    }
    if(typeof req.session.username == 'undefined'){
        req.session.username = "";
    }

    console.log("User at login");

    if(req.session.success){
        res.redirect('/getProfile');
    } else res.render('kake', {title: 'Login', success:req.session.success, errors: req.session.errors});
    console.log(req.session.success);
    req.session.errors = null;
});
app.get('/sessiontest',function(req,res,next){
    console.log(req.session.success);
    console.log(req.session.username);
    console.log(req.session.is_admin);

    auth.logOutUser(req,res,next);
    console.log(req.session.success);
    console.log(req.session.username);
    console.log(req.session.is_admin);

    res.send("hei");
});


app.post('/home',function(req,res){
    console.log("User clicked login");
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/home');
    }else {

        console.log("Trying to login");
        auth.logUserIn(req,res,auth.resCheck);
    }
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