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
var auth = require('./middlewares/authenticatePLANB');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

require('./helpers/passportConfig')(passport);


app.engine('hbs', hbs({extname : 'hbs', layoutsDir: __dirname + '/public/css'}));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine','hbs');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static (__dirname + '/public'));
app.use(expressValidator());
app.use(session({
    secret: "hest",
    store: new FileStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*60*24*1000*7
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', router);


app.get('/vrinsk',function(req,res,next){

    res.render('kake', {title: 'Form validation', success:req.session.success, errors: req.session.errors});
    req.session.errors = null;
});
app.get('/sessiontest',function(req,res,next){
    var sess = req.session;
    //console.log("USER: " + req.passport.username);
    if(sess.views){
        sess.views++;
        res.json({"Views":sess.views});
    }else{
        sess.views = 1;
        res.json({"Views":sess.views});
        next();
    }
});

app.post('/vrinsk',passport.authenticate('local-login', {
        failureRedirect: '/vrinsk',
        successRedirect: '/'
    }), function(req,res){
    //res.redirect('/');
    //res.sendFile(path.join(__dirname + '/index.html'));

});
app.post('/arneBrimi',passport.authenticate('local-login', {
    failureRedirect: '/vrinsk'}),function(req,res){
    res.json(req.user);
    //res.redirect('/sessiontest');
});
app.get('/logout', function(req,res){
        delete req.session.passport.user;
        res.json({message: req.session});
})
app.get('/gigi',function(req,res){

});

//require('./controllers/routes')(passport); // send inn app and passport for authentication and running

var server = app.listen(3000, function(){
    console.log("Live at 3000");
});


//tests imports app
module.exports = server;
//other exports
module.exports = session;
