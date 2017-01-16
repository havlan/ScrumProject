var cryptoHash = require('./cryptoHash');
var app = require('../app');
var passport = require('passport');
var query = require('./dbQ1');


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.username, user.is_admin);
});

passport.deserializeUser(function(username, done) { // finn login her
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
    passReqToCallback: true}, function(req,res){
    //FINN BRUKER DB query
    query.getSaltHash(req,res, function(err,user){
        if(err){
            console.log("ERROR LOGIN");
        }
        if(user){
            
        }
    });

}))

function isUserAdmin(req,res,user){
    return (req.session.user.is_admin);
}