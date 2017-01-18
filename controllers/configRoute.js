//routing


var express = require('express');
var getCtrl = require('./getReq');
var postCtrl = require('./postReq');


module.exports = function (app, passport) {
    app.get('/', isLoggedIn, getCtrl.getRoot);
    app.get('/user', isLoggedIn, getCtrl.getUser);
    app.get('/user/:id', isLoggedIn, getCtrl.getUser);
    app.get('/login', getCtrl.getLogin);
    app.get('/logout', logOut);
    app.get('/getEmployee', isAdmin, getCtrl.getEmployee);
    //app.get('/getDepartment/:department_id').get(getCtrl.getDepartment);
    app.get('/getType', isLoggedIn, getCtrl.getType);
    app.get('/getShift', isLoggedIn, getCtrl.getShift);
    app.get('/getShift_has_employee', isLoggedIn, getCtrl.getShift_has_employee);
    app.get('/getRequest', isLoggedIn, getCtrl.getRequest);
    app.get('/getAbsence', isLoggedIn, getCtrl.getAbsence);
    app.get('/getOvertime', isLoggedIn, getCtrl.getOvertime);
    app.get('/getUserInfo', isLoggedIn, getCtrl.getUserInfo);

//app.route('/getVaktoversikt').get(getCtrl.getVaktoversikt);


//post / put
    app.post('/login', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        console.log("LOGIN OK?");
        res.redirect('/');
    });
    app.post('/postUser', isAdmin, postCtrl.postEmployee);
    app.post('/postDepartment', isAdmin, postCtrl.postDepartment);
    app.post('/postType', isAdmin, postCtrl.postType);
    app.post('/postShift', isLoggedIn, postCtrl.postShift);
    app.post('/postShift_has_employee', isLoggedIn, postCtrl.postShift_has_employee);
    app.post('/postRequest', isLoggedIn, postCtrl.postRequest);
    app.post('/postAbsence', isLoggedIn, postCtrl.postAbsence);
    app.post('/postOvertime', isLoggedIn, postCtrl.postOvertime);
    app.post('/postLogInInfo', isLoggedIn, postCtrl.postLogInInfo);

};

//app.route('/*').get(getCtrl.get404);

function isLoggedIn(req, res, next) {
    console.log(req.session);
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log(req.session, " not authorized.");
        res.redirect('/login');
    }
}
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.session.passport) {
        if (req.session.passport.user.is_admin == 1) {
            next();
        }
    } else {
        res.redirect('/user');
    }
}
function logOut(req, res) {
    req.logout();
    res.redirect('/login');
}
//module.exports = app;
