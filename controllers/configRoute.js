//routing


var getCtrl = require('./getReq');
var postCtrl = require('./postReq');
var delCtrl = require('./delReq');
var model = require('../models/regWMail');


module.exports = function (app, passport) {
    app.get('/', isLoggedIn, getCtrl.getRoot);
    app.get('/user', isLoggedIn, getCtrl.getUser);
    app.get('/user/:id', isLoggedIn, getCtrl.getUser);
    app.get('/login', getCtrl.getLogin);
    app.get('/logout', logOut);
    app.get('/getEmployee', isOfficeEmp, getCtrl.getEmployee);
    app.get('/getOneEmployee', isLoggedIn, getCtrl.getOneEmployee);
    app.get('/getEmployeeRestricted',isLoggedIn,getCtrl.getEmployeeRestricted);
    //app.get('/getDepartment/:department_id').get(getCtrl.getDepartment);
    app.get('/getType', isLoggedIn, getCtrl.getType);
    app.get('/getShift', isLoggedIn, getCtrl.getShift);
    app.get('/getShift_has_employee', isLoggedIn, getCtrl.getShift_has_employee);
    app.get('/getRequest', isOfficeEmp, getCtrl.getRequest);
    app.get('/getAbsence', isOfficeEmp, getCtrl.getAbsence);
    app.get('/getOvertime', isOfficeEmp, getCtrl.getOvertime);
    //app.get('/getUserInfo', isLoggedIn, getCtrl.getUserInfo);
    app.get('/getVaktoversiktSite', isLoggedIn, getCtrl.getVaktoversiktSite);
    app.get('/getEmployee_Shifts_toCurrentDate', isLoggedIn, getCtrl.getEmployee_Shifts_toCurrentDate);
    app.get('/getEmployee_Shifts_fromCurrentDate', isLoggedIn, getCtrl.getEmployee_Shifts_fromCurrentDate);
    app.get('/getEmployee_Shifts_fromCurrentDate2', isLoggedIn, getCtrl.getEmployee_Shifts_fromCurrentDate2);
    app.get('/getPersonalShiftEvents',isLoggedIn, getCtrl.getPersonalShiftEvents);
    app.get('/getTypeNames',isLoggedIn, getCtrl.getTypeNames);
    app.get('/getPossibleShiftsEvents',isLoggedIn,getCtrl.getPossibleShiftsEvents);
    app.get('/getDepartment',isLoggedIn, getCtrl.getDepartment);
    app.get('/getNextShiftForEmp',isLoggedIn, getCtrl.getNextShiftForEmp);
    app.get('/getOvertimeView',isOfficeEmp,getCtrl.getOvertimeView);
    app.get('/getAbsenceView',isOfficeEmp,getCtrl.getAbsenceView);
    app.get('/getRequestView',isOfficeEmp,getCtrl.getRequestView);
    app.get('/getShiftChange', isLoggedIn,getCtrl.getShiftChange); // sjekk
    app.get('/getEmployee2',isLoggedIn,getCtrl.getEmployee2);
    app.get('/getAvailableShifts',isOfficeEmp,getCtrl.getAvailableShifts);
    app.get('/getAbsenceNum',isOfficeEmp,getCtrl.getAbsenceNum);
    app.get('/getOvertimeNum',isOfficeEmp,getCtrl.getOvertimeNum);
    app.get('/getChangeNum',isOfficeEmp,getCtrl.getChangeNum);
    app.get('/getClearenceLevel',isLoggedIn,getCtrl.getClearenceLevel);
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
    app.get('/getRequestShift/:id',isOfficeEmp,getCtrl.getRequestShift);

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

    app.post('/getVaktliste1', isLoggedIn, getCtrl.getVaktliste1); //sjekk
    app.post('/getVaktliste2', isLoggedIn, getCtrl.getVaktliste2);
    app.post('/getVaktliste3', isLoggedIn, getCtrl.getVaktliste3);

    app.post('/postUser', isOfficeEmp, postCtrl.postEmployee);
    app.delete('/delUser', isOfficeEmp, delCtrl.delLogin); // office auth
    app.post('/postDepartment', isOfficeEmp, postCtrl.postDepartment);
    app.post('/postType', isOfficeEmp, postCtrl.postType);
    app.post('/postShift', isOfficeEmp, postCtrl.postShift);
    app.post('/postShift_has_employee', isOfficeEmp, postCtrl.postShift_has_employee);
    app.post('/postRequest', isLoggedIn, postCtrl.postRequest);
    app.post('/postRequestShift', isLoggedIn, postCtrl.postRequestShift);
    app.post('/postAbsence', isLoggedIn, postCtrl.postAbsence);
    app.post('/postOvertime', isLoggedIn, postCtrl.postOvertime);
    app.post('/postLogInInfo', isOfficeEmp, postCtrl.postLogInInfo);
    app.post('/updateShift_has_employee', isOfficeEmp, model.confirmShiftChange); // 1
    app.post('/updateEmployee', isOfficeEmp, postCtrl.updateEmployee);
    app.post('/updateEmployeePersonalInfo',isLoggedIn,postCtrl.updateEmployeePersonalInfo);
    app.post('/updateType', isOfficeEmp, postCtrl.updateType);
    app.post('/updateShift', isOfficeEmp, postCtrl.updateShift);
    app.post('/updateDepartment', isOfficeEmp, postCtrl.updateDepartment);
    app.post('/updateRequest', isOfficeEmp, postCtrl.updateRequest);
    app.post('/updateRequest2', isOfficeEmp, postCtrl.updateRequest2); // 2
    app.post('/newLogin', isOfficeEmp , model.sendOnlyLogin);
    app.post('/updateAbsence2', isOfficeEmp, postCtrl.updateAbsence2);
    app.post('/updateOvertime', isOfficeEmp, postCtrl.updateOvertime);
    app.post('/updateOvertime2', isOfficeEmp, postCtrl.updateOvertime2);
    app.post('/updateLogInInfo', isOfficeEmp, postCtrl.updateLogInInfo);
  //  app.post('/newUser',isLoggedIn,postCtrl.postNewUser);
    app.post('/forgotPassword',model.forgotPwMail);
    app.post('/newEmployee',isOfficeEmp, function(req, res){
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
    app.post('/bulkAvail', postCtrl.insertBulkAvailability);

    app.post('/getEmpForShiftDateAll', isAdmin, getCtrl.getEmpForShiftDateAll);

    app.post('/changePassword', isLoggedIn, model.changePassword);
    app.post('/acceptRequestWith', isOfficeEmp, model.acceptRequestWith);
    app.get('/getAvailableEmpForShift/:id',isOfficeEmp, getCtrl.getAvailableEmpForShift);
    app.post('/getEmpForShiftDate', isAdmin, getCtrl.getEmpForShiftDate);
    app.delete('/deleteShift_has_employee',isOfficeEmp,delCtrl.delShift_has_employee);
    app.delete('/deleteRequest_shift',isOfficeEmp,delCtrl.delRequest_shift);
    app.delete('/deleteRequest',isOfficeEmp,delCtrl.delRequest);
    app.delete('/deleteAbsence',isOfficeEmp,delCtrl.delAbsence);
    app.delete('/deleteOvertime',isOfficeEmp,delCtrl.delOvertime);

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
