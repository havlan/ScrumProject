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

module.exports = function(passport) {
    passport.serializeUser(function(user,done){
        console.log("SERIALIZING");
        console.log(user.Username);
        done(null, {
            username : user.Username,
            id: user.employee_id,
            is_admin: user.is_admin
    });
       console.log("DONE");
    });
    passport.deserializeUser(function(username, done){
        console.log("DESERIALIZING");
        basseng.getConnection(function(err, connection){
            if(err){
                return done(err);
            }
            connection.query('select * from LoginInfo where username = ?',[username],function(err,rows){
                if(!rows || err){
                    return done(null,false, {message:"Hell"});
                }
                connection.release();
                console.log(rows);
                done(err,rows[0]);
            } );
        });
    });

     /*passport.deserializeUser(function(username, done) { // FAILED TO DESERIALIZE????
     db.query('SELECT * FROM LoginInfo WHERE Username = ?', [username], function(err, result) {
         if (err){
             console.log(err);
         } else {
             console.log(result);
         }
         if (!err) {
             done(null, result[0]);
         } else {
             done(err, null);
         }
         });
     });*/


    passport.use('local-login',new localStrat({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req,username,password, done) {
            console.log("SIGN IN METHOD CALLED");
            console.log("URS" + username);
            basseng.getConnection(function(err, connection){
                connection.query("select * from LoginInfo where Username = ?", [username], function (err, rows) {
                    connection.release();
                    //console.log(rows);
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
