//var basseng = require('./dbConfig');
var cryptoHash = require('./../middlewares/cryptoHash');
var localStrat = require('passport-local').Strategy;
var mysql = require('mysql');


var basseng = mysql.createPool({
    connectionLimit: 27,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_scrum04',
    password: 'gBq9reK7',
    database: 'g_scrum04',
    debug: false
});

module.exports = {
    isLoggedIn: function (req, res, next) {
        if (req.session.passport.user) {
            return next();
        } else {
            res.redirect('/login');
        }
    },
    isAdminIn : function(req,res,next){
        if(!typeof req.session.passport.user == 'undefined' && req.session.passport.user.is_admin == 1){
            return next();
        }else{
            res.redirect('/login');
        }
    }
}

module.exports = function(passport) {
    passport.serializeUser(function(user,done){
        console.log("SERIALIZING");
        console.log(JSON.stringify(user));
        done(null, {
            username : user.username,
            id: user.employee_id,
            is_admin: user.is_admin
    });
        console.log("DONE SERIALIZING");
    });
    passport.deserializeUser(function(username, done){
        console.log("DESERIALIZING");
        basseng.getConnection(function(err, connection){
            if(err){
                return done(err);
            }
            connection.query('select * from LoginInfo where username = ?',[username],function(err,rows){
                connection.release();
                if(!rows){
                    return done(null,false, {message:"Incorrect username"});
                }
                if(err){
                    return done(err);
                }
                //console.log(rows);
                done(err,rows[0]);
            } );
        });
    });
    passport.use('local-login',new localStrat({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req,username,password, done) {
            basseng.getConnection(function(err, connection){
                connection.query("select * from LoginInfo where Username = ?", [username], function (err, rows) {
                    connection.release();
                    //console.log(rows);
                    if (!rows.length) {
                        return done(null, false, req.flash("loginMsg", "No user found."));
                    }
                    if (err) {
                        return done(err);
                    }
                    if (!cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash) {
                        return done(null, false, req.flash("loginMsg", "WHooooooooops, wrong password."));
                    }
                    console.log("LOGIN OK");
                    //req.login(); // wtf man
                    return done(null, rows[0]);
                })
            });
        }
    ))
}
