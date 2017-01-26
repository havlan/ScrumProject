var mysql = require('mysql');
var cryptoHash = require('./../middlewares/cryptoHash');
var localStrat = require('passport-local').Strategy;
var pool = require('./db').getPool();
var safereg = require('safe-regex');

//passport configuration
module.exports = function (passport) {
    /*passport.serializeUser(function(user, done) {
     done(null, {username:user.username,id:user.employee_id, is_admin :user.is_admin});
     });

     // used to deserialize the user
     passport.deserializeUser(function(username, done) {
     pool.query("SELECT * FROM LoginInfo WHERE username = ? ",username, function(err, rows){
     done(err, rows[0]);
     });
     });*/

    passport.serializeUser(function (user, done) {
        //console.log("SERIALIZING");
        //console.log(JSON.stringify(user));
        done(null, {
            username: user.username,
            id: user.employee_id,
            is_admin: user.is_admin
        });
        //console.log("DONE SERIALIZING");
    })
    /*passport.deserializeUser(function(username,done){
     pool.query("select * from LoginInfo where username = ?", [username],function(err,rader){
     console.log("USERNAME IN DESERIALIZE",username);
     done(err,rader[0]);
     })
     });*/
    passport.deserializeUser(function (user, done) {
        console.log("DESERIALIZING");
        pool.getConnection(function (err, connection) {
            if (err) {
                return done(err);
            }
            connection.query('select * from LoginInfo where username = ?', [user.username], function (err, rows) {
                connection.release();
                if (!rows) {
                    return done(null, false, {status:404, melding: "Sjekk brukernavn."});
                }
                if (err) {
                    return done(err);
                }
                //console.log(rows[0]);
                done(err, rows[0]);
            });
        });
    });
    passport.use('login', new localStrat({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            console.log("USERNAME SAFE REG ", safereg(username));
            pool.getConnection(function (err, connection) {
                connection.query("select * from LoginInfo where Username = ?", [username], function (err, rows) {
                    connection.release();
                    //console.log(rows);
                    if (!rows.length) {
                        return done(null, false, {status:404, melding : "Feil brukernavn."});
                    }
                    if (err) {
                        return done(err);
                    }
                    if (!(cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash)) {
                        return done(null, false, {status: 404, melding : "Feil passord."});
                    }
                    return done(null, rows[0]);
                })
            });
        }
    ))
};