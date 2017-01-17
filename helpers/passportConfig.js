var pool = require('./dbConfig');
var cryptoHash = require('./../middlewares/cryptoHash');
var localStrat = require('passport-local').Strategy;



module.exports = function(passport) {
    passport.serializeUser(function(user,done){
        console.log(user);
        done(null,user);
    });
     passport.deserializeUser(function(username, done) { // FAILED TO DESERIALIZE????
     db.query('SELECT * FROM LoginInfo WHERE Username = ?', [username], function(err, result) {
         if (err){
             console.log(err);
         } else {
             console.log(result);
         }
         if (!err) {
             done(null, result);
         } else {
             done(err, null);
         }
         });
     });


    passport.use('local-login',new localStrat({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req,username,password, done) {
            console.log("SIGN IN METHOD CALLED");
            console.log("URS" + username);
            pool.getConnection(function(err,connection){
                connection.query("select * from LoginInfo where Username = ?", [username], function (err, rows) {
                    connection.release();
                    if (err) {
                        return done(err);
                    }
                    if (!rows) {
                        return done(null, false, {message: "Incorrect username"});
                    }
                    console.log(rows[0]);
                    if (!cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash) {
                        return done(null, false, {message: "Incorrect password"});
                    }
                    return done(null, rows[0]);
                })
            });
        }
    ))
}
