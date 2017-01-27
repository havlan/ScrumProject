//routing


var getCtrl = require('./getReq');
var postCtrl = require('./postReq');
var delCtrl = require('./delReq');
var model = require('../models/regWMail');



module.exports = function (app, passport) {
    app.get('/', isLoggedIn, getCtrl.getRoot);
    app.get('/user', isLoggedIn, getCtrl.getUser); //nei
    app.get('/user/:id', isLoggedIn, getCtrl.getUser);
    app.get('/login', getCtrl.getLogin);
    app.get('/logout', logOut);
    app.get('/getEmployee', isOfficeEmp, getCtrl.getEmployee); // ok
    app.get('/getOneEmployee', isLoggedIn, getCtrl.getOneEmployee); // ok
    app.get('/getEmployeeRestricted',isLoggedIn,getCtrl.getEmployeeRestricted); // ok
    app.get('/getType', isLoggedIn, getCtrl.getType);
    app.get('/getShift', isLoggedIn, getCtrl.getShift);
    app.get('/getShift_has_employee', isLoggedIn, getCtrl.getShift_has_employee);
    app.get('/getRequest', isOfficeEmp, getCtrl.getRequest);
    app.get('/getAbsence', isOfficeEmp, getCtrl.getAbsence);
    app.get('/getOvertime', isOfficeEmp, getCtrl.getOvertime);
    app.get('/getVaktoversiktSite', isLoggedIn, getCtrl.getVaktoversiktSite);
    app.get('/getEmployee_Shifts_toCurrentDate', isLoggedIn, getCtrl.getEmployee_Shifts_toCurrentDate);//ok
    app.get('/getEmployee_Shifts_fromCurrentDate', isLoggedIn, getCtrl.getEmployee_Shifts_fromCurrentDate); // ok
    app.get('/getPersonalShiftEvents',isLoggedIn, getCtrl.getPersonalShiftEvents); // ok
    app.get('/getTypeNames',isLoggedIn, getCtrl.getTypeNames); // ok
    app.get('/getPossibleShiftsEvents',isLoggedIn,getCtrl.getPossibleShiftsEvents); // ok
    app.get('/getDepartment',isLoggedIn, getCtrl.getDepartment); // ok
    app.get('/getNextShiftForEmp',isLoggedIn, getCtrl.getNextShiftForEmp); // ok
    app.get('/getOvertimeView',isOfficeEmp,getCtrl.getOvertimeView); // ok
    app.get('/getAbsenceView',isOfficeEmp,getCtrl.getAbsenceView); // ok
    app.get('/getRequestView',isOfficeEmp,getCtrl.getRequestView); // ok
    app.get('/getShiftChange', isLoggedIn,getCtrl.getShiftChange); // sjekk
    app.get('/getEmployee2',isLoggedIn,getCtrl.getEmployee2);
    app.get('/getAvailableShifts',isOfficeEmp,getCtrl.getAvailableShifts); // ok
    app.get('/getAbsenceNum',isOfficeEmp,getCtrl.getAbsenceNum); // ok
    app.get('/getOvertimeNum',isOfficeEmp,getCtrl.getOvertimeNum); // ok
    app.get('/getChangeNum',isOfficeEmp,getCtrl.getChangeNum); // ok
    app.get('/getClearenceLevel',isLoggedIn,getCtrl.getClearenceLevel); // ok
    app.get('/getPersonalShiftEventsDone', isLoggedIn, getCtrl.getPersonalShiftEventsDone);

    app.get('/getAvailability',isLoggedIn, getCtrl.getAvailability);

    //Sites
    app.get('/menu', isLoggedIn, getCtrl.getMenuSite);
    app.get('/overviewForAdmin', isOfficeEmp, getCtrl.getOverviewForAdminSite);
    app.get('/myProfile', isLoggedIn, getCtrl.getMyProfileSite);
    app.get('/vaktoversikt', isOfficeEmp, getCtrl.getVaktoversiktSite);
    app.get('/calendar', isLoggedIn, getCtrl.getCalendarSite);
    app.get('/approvalAdmin', isOfficeEmp, getCtrl.getApprovalAdminSite);
    app.get('/frontpageAdmin', isOfficeEmp, getCtrl.getFrontpageAdminSite);
    app.get('/OnePagedMenu', isLoggedIn, getCtrl.getOnePagedMenu);
    app.get('/frontpageSuper', isAdmin, getCtrl.getFrontpageSuperSite);
    app.get('/overviewEmp', isLoggedIn, getCtrl.getOverviewEmpSite);
    app.get('/availability', isLoggedIn, getCtrl.getAvailabilitySite);
    app.get('/appeal', isLoggedIn, getCtrl.getAppeal);
    app.get('/adminShifts', isOfficeEmp, getCtrl.getAdminShifts);
    app.get('/getRequestShift/:id',isOfficeEmp,getCtrl.getRequestShift); // ok

    //Images
    app.get('IMG01', isLoggedIn, getCtrl.getLogo);

    //post / put
    app.post('/login', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        if(req.session.passport.user.is_admin == 1){
            res.redirect('/frontpageAdmin');
        }else {
            console.log("LOGIN OK?");
            res.redirect('/calendar');
        }
        });

    app.post('/bulkTest1', postCtrl.insertBulkTest);
    app.post('/bulkAvail', postCtrl.insertBulkAvailability);

    app.post('/getVaktliste1', isLoggedIn, getCtrl.getVaktliste1); //sjekk ok
    app.post('/getVaktliste2', isLoggedIn, getCtrl.getVaktliste2); // ok
    app.post('/getVaktliste3', isLoggedIn, getCtrl.getVaktliste3); // ok
    app.post('/newLogin', isOfficeEmp , model.sendOnlyLogin); // ok
    app.post('/postUser', isOfficeEmp, postCtrl.postEmployee);
    app.delete('/delUser', isOfficeEmp, delCtrl.delLogin); // ok
    app.post('/postDepartment', isOfficeEmp, postCtrl.postDepartment);
    app.post('/postType', isOfficeEmp, postCtrl.postType);
    app.post('/postShift', isOfficeEmp, postCtrl.postShift);
    app.post('/postShift_has_employee', isOfficeEmp, postCtrl.postShift_has_employee);
    app.post('/postRequest', isLoggedIn, postCtrl.postRequest); // ok BAD NAMECHOISE
    app.post('/postRequestShift', isLoggedIn, postCtrl.postRequestShift); // ok
    app.post('/postAbsence', isLoggedIn, postCtrl.postAbsence);
    app.post('/postOvertime', isLoggedIn, postCtrl.postOvertime);
    app.post('/postLogInInfo', isOfficeEmp, postCtrl.postLogInInfo);
    app.post('/updateShift_has_employee', isOfficeEmp, model.confirmShiftChange); // ok
    app.post('/updateEmployee', isOfficeEmp, postCtrl.updateEmployee); // ok
    app.post('/updateEmployeePersonalInfo',isLoggedIn,postCtrl.updateEmployeePersonalInfo); // ok
    app.post('/updateType', isOfficeEmp, postCtrl.updateType);
    app.post('/updateShift', isOfficeEmp, postCtrl.updateShift);
    app.post('/updateDepartment', isOfficeEmp, postCtrl.updateDepartment);
    app.post('/updateRequest', isOfficeEmp, postCtrl.updateRequest);
    app.post('/updateRequest2', isOfficeEmp, postCtrl.updateRequest2); // 2
    app.post('/updateAbsence2', isOfficeEmp, postCtrl.updateAbsence2); // ok
    app.post('/updateOvertime', isOfficeEmp, postCtrl.updateOvertime);
    app.post('/updateOvertime2', isOfficeEmp, postCtrl.updateOvertime2); // ok
    app.post('/updateLogInInfo', isOfficeEmp, postCtrl.updateLogInInfo);
  //  app.post('/newUser',isLoggedIn,postCtrl.postNewUser);
    app.post('/forgotPassword',model.forgotPwMail); // ok
    app.post('/newEmployee',isOfficeEmp, function(req, res){ //ok
        model.postNewUserFall(req,res, function(err,res){
            if(err){
                console.log("\n\n===ERR===\n\n");
            }else{
                console.log("Method success??\n");
                console.log(res);
                res.json(res);
            }

        })
    });

    app.post('/changePassword', isLoggedIn, model.changePassword);
    app.post('/acceptRequestWith', isOfficeEmp, model.acceptRequestWith);
    app.get('/getAvailableEmpForShift/:id',isOfficeEmp, getCtrl.getAvailableEmpForShift);
    app.post('/getEmpForShiftDate', isAdmin, getCtrl.getEmpForShiftDate); // ok
    app.delete('/deleteShift_has_employee',isOfficeEmp,delCtrl.delShift_has_employee); // ok
    app.delete('/deleteRequest_shift',isOfficeEmp,delCtrl.delRequest_shift); // ok
    app.delete('/deleteRequest',isOfficeEmp,delCtrl.delRequest); // ok
    //MÅ VÆRE SIST
    app.get('/forbudt',getCtrl.get403);
    app.get('/*', getCtrl.get404);

};

//app.route('/*').get(getCtrl.get404);

function isLoggedIn(req, res, next) {
    //console.log(req.session);
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log(req.session, " not authorized.");
        res.redirect('/login');
    }
}
function isOfficeEmp (req,res,next){
    if(req.isAuthenticated() && req.session.passport){
        if(req.session.passport.user.is_admin == 1 || req.session.passport.user.is_admin == 0){
            next();
        }else{
            res.status(403).redirect('/forbudt');
        }
    }else{
        res.redirect('/login');
    }
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.session.passport) {
        if (req.session.passport.user.is_admin == 0) {
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
