var cryptoHash = require('./cryptoHash');
var app = require('../app');
var query = require('./dbQ1');
var path = require('path');

var session = require('../app');


module.exports = {
    logUserIn: function (req, res, next) {
        if (typeof req.session.success == 'undefined') { // checks if session already exists
            req.session.success = false;
        }
        if (typeof req.session.is_admin == 'undefined') {
            req.session.is_admin = false;
        }
        if (typeof req.session.username == 'undefined') {
            req.session.username = "";
        }

        checkIfSaltHash(req, res, next);
    },
    resCheck: function (req, res, rows) {

        if (res.length > 0) {
            if (res) {

                if (cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash) {
                    req.session.is_admin = rows[0].is_admin;
                    req.session.success = true;
                    req.session.username = req.body.username;
                    res.redirect('/getProfile');
                    //res.end();
                } else {
                    console.log("NOPE");
                    res.redirect("/loginmv");
                }
            }
        } else {
            console.log("Not auth");
            res.redirect("/loginmv");
        }
    }
}


function checkIfSaltHash(req, res, next) {
    if (req.body.username != "") {
        console.log("1. calling getSaltHash");
        query.getSaltHash(req, res, next);
    } else {
        console.log("1. returning false");
        return false;
    }
}