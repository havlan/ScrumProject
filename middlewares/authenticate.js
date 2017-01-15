var cryptoHash = require('./cryptoHash');
var app = require('../app');
var query = require('./dbQ1');

var session = require('../app');


function isAuth(req,res){
    return req.session.success;
}
