var mysql = require('mysql');
var cryptoHash = require('./cryptoHash');
var localStrat = require('passport-local').Strategy;
var pool = require('./../helpers/db').getPool();
var safereg = require('safe-regex');

//passport configuration
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, {
            username: user.username,
            id: user.employee_id,
            is_admin: user.is_admin
        });
    })

    passport.deserializeUser(function (user, done) {
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