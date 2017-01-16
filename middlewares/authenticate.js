var cryptoHash = require('./cryptoHash');
var app = require('../app');
var query = require('./dbQ1');

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
        if (checkIfSaltHash(req, res)) {
            if (cryptoHash.sha512(req.body.password, res.password_salt) == res.password_hash) {
                console.log("SALT: " + res.password_salt + "\nHash: " + res.password_hash);
                req.session.is_admin = res.is_admin;
                req.session.success = true;
                req.session.username = req.body.username;
                console.log("INNER INNER INNER AUTH METHOD");
                console.log("StatusCode should be 200");
                next();
            }
        } else {
            console.log("Not auth");
            res.send("Not identified");
        }
    }
}

function checkIfSaltHash(req,res){
    if(req.body.username != "" || req.body.username != null) {
        query.getSaltHash(req, res);
        if (res.length > 0) {
            if (res) {
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