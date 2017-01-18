var cryptoHash = require('./cryptoHash');
var app = require('../app');
var query = require('./dbQ1');

var session = require('../app');


module.exports = {
    logUserIn: function (req, res, next) {
        if (typeof req.session.success == 'undefined') { // checks if session already exists
            console.log("IF 1");
            req.session.success = false;
        }
        if (typeof req.session.is_admin == 'undefined') {
            req.session.is_admin = false;
            console.log("IF 2");
        }
        if (typeof req.session.username == 'undefined') {
            req.session.username = req.body.username;
            console.log("IF 3");
        }

        if (req.session.success == false){
                checkIfSaltHash(req,res,next)
                console.log("USER EXISTS");
                if (cryptoHash.sha512(req.body.password, res.password_hash) == res.password_hash) {
                    console.log("Hash OK");
                    req.session.is_admin = res.is_admin;
                    req.session.success = true;
                    req.session.username = req.body.username;
                    console.log("INNER INNER INNER AUTH METHOD");
                    console.log("StatusCode should be 200");
                    next();
                } else {
                    console.log("Check pass/username");
                }
            };
    },

    isLoggedIn : function (req,res,next){
        if(req.session.success){
            return next();
        }else{
            res.redirect('/login');
        }
    },




}

function checkIfSaltHash(req,res,next){
    if(req.body.username != "" && req.body.username != null) {
        query.getSaltHash(req, res);
        if (res.length > 0) {
            if (res) {
                next();
                return true;
            }
        } else {
            return false;
        }
    }
}

function isAuth(req,res,next){


}
function isInAdminMode(req,res,next){

}