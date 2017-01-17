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

        console.log("IN RESCHECK");

        if (res.length > 0) {
            if (res) {
                if (cryptoHash.sha512(req.body.password, rows[0].password_salt).passwordHash == rows[0].password_hash) {
                    req.session.is_admin = rows[0].is_admin;
                    req.session.success = true;
                    req.session.username = req.body.username;
                    console.log("HEE");
                    console.log(req.session);
                    res.sendFile(path.join(__dirname + '/../index.html'));
                    //res.redirect('/getProfile');
                    //res.end();

                } else {
                    console.log("NOPE");
                    res.redirect("/home");
                }
            }
        } else {
            console.log("Not auth");
            res.redirect("/loginmv");
        }
    },
    logOutUser : function (req,res,next) {
        delete req.session.is_admin;
        delete req.session.success;
        delete req.session.username;
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