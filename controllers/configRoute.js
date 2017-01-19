//routing


var getCtrl = require('./getReq');
var postCtrl = require('./postReq');


module.exports = function (app, passport) {
    if(process.env.NODE_ENV == 'dev'){
        console.log("===DEV MODE===");
        app.post('/login').send({
            username:'Alfonso',
            password:'pizza123'
        });
    }
    app.get('/', isLoggedIn, getCtrl.getRoot);
    app.get('/user', isLoggedIn, getCtrl.getUser); // db
    app.get('/user/:id', isLoggedIn, getCtrl.getUser);
    app.get('/login', getCtrl.getLogin);
    app.get('/logout', logOut);
    app.get('/getEmployee',  getCtrl.getEmployee);
    app.get('/getOneEmployee', isLoggedIn, getCtrl.getOneEmployee);
    //app.get('/getDepartment/:department_id').get(getCtrl.getDepartment);
    app.get('/getType', isLoggedIn, getCtrl.getType);
    app.get('/getShift', isLoggedIn, getCtrl.getShift);
    app.get('/getShift_has_employee', isLoggedIn, getCtrl.getShift_has_employee);
    app.get('/getRequest', isLoggedIn, getCtrl.getRequest);
    app.get('/getAbsence', isLoggedIn, getCtrl.getAbsence);
    app.get('/getOvertime', isLoggedIn, getCtrl.getOvertime);
    //app.get('/getUserInfo', isLoggedIn, getCtrl.getUserInfo);
    app.get('/getVaktliste', isLoggedIn, getCtrl.getVaktliste);
    app.get('/getEmployeeShiftsToCurrent', isLoggedIn, getCtrl.getEmployee_shifts_toCurrentDate);


    //Sites
    app.get('/menu', isLoggedIn, getCtrl.getMenuSite);
    app.get('/overviewForAdmin', isLoggedIn, getCtrl.getOverviewForAdminSite);
    app.get('/myProfile', isLoggedIn, getCtrl.getMyProfileSite);
    app.get('/vaktoversikt', isLoggedIn, getCtrl.getVaktoversiktSite);
    app.get('/calendar', isLoggedIn, getCtrl.getCalendarSite);
    app.get('/approvalAdmin', isLoggedIn, getCtrl.getApprovalAdminSite);
    app.get('/frontpageAdmin', isLoggedIn, getCtrl.getFrontpageAdminSite);
    app.get('/getVaktoversiktSite', isLoggedIn, getCtrl.getVaktoversiktSite);

    //Images
    app.get('IMG01', isLoggedIn, getCtrl.getLogo);

    //post / put
    app.post('/login', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        console.log("LOGIN OK");
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
    app.post('/updateShift_has_employee', isLoggedIn, postCtrl.updateShift_has_employee);
    app.post('/updateEmployee', isLoggedIn, postCtrl.updateEmployee);
    app.post('/updateType', isLoggedIn, postCtrl.updateType);
    app.post('/updateShift', isLoggedIn, postCtrl.updateShift);
    app.post('/updateDepartment', isLoggedIn, postCtrl.updateDepartment);
    app.post('/updateRequest', isLoggedIn, postCtrl.updateRequest);
    app.post('/updateAbsence', isLoggedIn, postCtrl.updateAbsence);
    app.post('/updateOvertime', isLoggedIn, postCtrl.updateOvertime);
    app.post('/updateLogInInfo', isLoggedIn, postCtrl.updateLogInInfo);


    //MÅ VÆRE SIST
    app.get('/*',getCtrl.get404);

};

//app.route('/*').get(getCtrl.get404);

function isLoggedIn(req, res, next) {
    //console.log(req.session);
    if (req.isAuthenticated()) {
        next();
    } else {
        //console.log(req.session, " not authorized.");
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
