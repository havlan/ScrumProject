var q = require('../helpers/dbConfig');
var cryptoHash = require('./cryptoHash');
var localStrat = require('passport-local').Strategy;



/*module.exports = function(passport) {

    passport.serializeUser(function(user,done){
        done(null,user.username);
    });

    passport.deserializeUser(function(username, done){
        q.getdbQuery("select  * from LoginInfo where Username = ? ", [username],function(err,rows){
            return done(null,rows[0].Username);
        });
    });

    //FEL
    passport.use('local-login',new localStrat({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req,username,password, done) {
            console.log("SIGN IN METHOD CALLED");
            console.log("URS" + username);
            q.dbQuery("select * from LoginInfo where Username = ?", [username], function (err, rows) {
                if (err) {
                    return done(err);
                }
                if (!rows) {
                    return done(null, false, {message: "Incorrect username"});
                }

                if (!cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash) {
                    return done(null, false, {message: "Incorrect password"});
                }
                return done(null, rows[0]);
            });
        }
    ))
}*/


/*module.exports = {
    findOne : function(req,res){
        conn.query("select Username, password_salt, password_salt, is_admin from LoginInfo where Username = ?",req.body.Username,function(err,user){
            connection.release();
            if(err){
                return done(err);
            }
            if(!rows){
                return done(null,false,{message: "Incorrect username"});
            }

            if(!cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash){
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null,user);
        })


    }

}*/