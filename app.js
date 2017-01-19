var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//var router = require('./controllers/routes');
var session = require('express-session');
var expressValidator = require('express-validator')
var passport = require('passport');
var hbs = require('express-handlebars');
var auth = require('./middlewares/authenticatePLANB');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

require('./helpers/passtheport')(passport);


app.engine('hbs', hbs({extname : 'hbs', layoutsDir: __dirname + '/public/css'}));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine','hbs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.query());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static (__dirname + '/public'));
//app.use('/views',express.static(__dirname + '/views'));
app.use(expressValidator());
app.use(session({
    secret: "hest",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*60*24*1000*7
    }
}));
/*app.use(function(req,res,next){
   //res.header('Content-Type', 'application/json');
    next();
});*/

app.use(function(req,res,err,next){
    if(err){
        res.body.error = err;
        console.log("Error added to req.error");
    }else{
        next();
    }
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//pass passport auth and app to route config
require('./controllers/configRoute')(app,passport);

var server = app.listen(3000, function(){
    console.log("Live at ",this.address().port);
});




//tests imports app
module.exports = server;
//other exports
//module.exports = session;
