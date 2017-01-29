var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var expressValidator = require('express-validator')
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var cron = require('cron');
var mod = require('./models/schedulerSM');
var compression = require('compression');
require('./middlewares/passtheport')(passport); // pass passport to config (serialize, deserialize)


app.set('views', path.join(__dirname + '/views'));
app.set('view engine','hbs');
//app.use(morgan('dev')); // dev logging
app.use(cookieParser()); // parse cookies
app.use(express.query());
app.use(bodyParser.json({ // parse json
    "strict": true,
    "type": "*/json"
}));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static (__dirname + '/public')); // css/js
app.use(expressValidator()); // escape
app.use(helmet()); // safety pkg
app.use(compression()); // compresses req,res headers to reduce responsetime

app.use(session({ // session, keeps user logged in etc
    secret: "0havvv1h32hewfivoi",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*60*24*1000*7,
        httpOnly:true
    }
}));


app.use(passport.initialize()); // session init
app.use(passport.session()); // passport config session
app.use(flash()); // flash req msg
app.use(helmet.contentSecurityPolicy({ // csp protection vs scripts
    directives: {
        "defaultSrc": ["'self'"],
        "scriptSrc":["'self'" ,"'unsafe-inline'", "maxcdn.bootstrapcdn.com" , "ajax.googleapis.com", "cdn.datatables.net"],
        "styleSrc": ["'unsafe-inline'","'self'","'self'/public/css",'maxcdn.bootstrapcdn.com'],
        "fontSrc" : ["*"],
        "imgSrc":["'self'", "'self'/public/img"]
    }
}));

app.use(function(req,res,next){ // escape
    if(req.body) {
        for (var item in req.body) {
            req.sanitize(item).escape();
        }
    }
    next();
});

var job = new cron.CronJob('00 00 05 * * 7', function(){ // mail sent 05:00:00 sunday night, about available shifts
    mod.sendMailOnFree();
}, function(){
}, true, 'Europe/Oslo');



//pass passport auth and app to route config
require('./controllers/configRoute')(app,passport);

var server = app.listen(3000, function(){
    console.log("Live at ",this.address().port);
});


var documentation = require('documentation');
var fs = require('fs');

documentation.build(['app.js'], {}, function (err, res) {
    documentation.formats.md(res, {}, function(err, output) {
        // output is a string of JSON data
        fs.writeFileSync('./output.md', output);
    });
});

//tests imports app
module.exports = server;
//other exports
//module.exports = session;
