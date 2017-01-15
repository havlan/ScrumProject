var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./controllers/routes');
var session = require('express-session');
var expressValidator = require('express-validator')
var passport = require('passport');
var hbs = require('express-handlebars');



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
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*24*1000}
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
app.get('/vrinsk',function(req,res,next){
    res.render('kake', {title: 'Form validation', success:req.session.success, errors: req.session.errors});
    req.session.errors = null;
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

app.post('/vrinsk',function(req,res){
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min:7}).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/vrinsk');
    }else{
        req.session.success = true;
        res.redirect('/');
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