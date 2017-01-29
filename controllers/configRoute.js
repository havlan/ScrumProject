//routing


var getCtrl = require('./getReq');
var postCtrl = require('./postReq');
var delCtrl = require('./delReq');
var model = require('../models/regWMail');
var shiftModel = require('../models/shiftModel');


module.exports = function (app, passport) {
    app.get('/', isLoggedIn, getCtrl.getRoot); // html ret
    app.get('/login', getCtrl.getLogin); // html return
    app.get('/logout', logOut); // logout -> redir login
    app.get('/getEmployee', isOfficeEmp, getCtrl.getEmployee); // sql
    app.get('/getOneEmployee', isLoggedIn, getCtrl.getOneEmployee); // sql with session.passport.user.id
    app.get('/getEmployeeRestricted',isLoggedIn,getCtrl.getEmployeeRestricted); // sql
    app.get('/getType', isLoggedIn, getCtrl.getType); // sql
    app.get('/getShift', isLoggedIn, getCtrl.getShift); // sql
    app.get('/getShift_has_employee', isLoggedIn, getCtrl.getShift_has_employee); // sql
    app.get('/getRequest', isOfficeEmp, getCtrl.getRequest); // sql
    app.get('/getAbsence', isOfficeEmp, getCtrl.getAbsence); //sql
    app.get('/getOvertime', isOfficeEmp, getCtrl.getOvertime); // sql
    app.get('/getVaktoversiktSite', isLoggedIn, getCtrl.getVaktoversiktSite); // sql
    app.get('/getEmployee_Shifts_toCurrentDate', isLoggedIn, getCtrl.getEmployee_Shifts_toCurrentDate); // sql
    app.get('/getEmployee_Shifts_fromCurrentDate', isLoggedIn, getCtrl.getEmployee_Shifts_fromCurrentDate); // sql
    app.get('/getEmployee_Shifts_fromCurrentDate2', isLoggedIn, getCtrl.getEmployee_Shifts_fromCurrentDate2); // sql
    app.get('/getPersonalShiftEvents',isLoggedIn, getCtrl.getPersonalShiftEvents); // sql
    app.get('/getTypeNames',isLoggedIn, getCtrl.getTypeNames); // sql
    app.get('/getPossibleShiftsEvents',isLoggedIn,getCtrl.getPossibleShiftsEvents); // sql
    app.get('/getDepartment',isLoggedIn, getCtrl.getDepartment); // sql
    app.get('/getNextShiftForEmp',isLoggedIn, getCtrl.getNextShiftForEmp); // sql
    app.get('/getOvertimeView',isOfficeEmp,getCtrl.getOvertimeView); // sql
    app.get('/getAbsenceView',isOfficeEmp,getCtrl.getAbsenceView); // sql
    app.get('/getRequestView',isOfficeEmp,getCtrl.getRequestView); // sql
    app.get('/getShiftChange', isLoggedIn,getCtrl.getShiftChange); //
    app.get('/getEmployee2',isLoggedIn,getCtrl.getEmployee2); // sql
    app.get('/getAvailableShifts',isOfficeEmp,getCtrl.getAvailableShifts);  // sql
    app.get('/getAbsenceNum',isOfficeEmp, getCtrl.getAbsenceNum); // sql
    app.get('/getOvertimeNum',isOfficeEmp,getCtrl.getOvertimeNum); // sql
    app.get('/getChangeNum',isOfficeEmp,getCtrl.getChangeNum);  // sql
    app.get('/getClearenceLevel',isLoggedIn,getCtrl.getClearenceLevel);  // sql
    app.get('/getPersonalShiftEventsDone', isLoggedIn, getCtrl.getPersonalShiftEventsDone); // sql
    app.get('/getLoginInfoEmployee/:id',isOfficeEmp,getCtrl.getLoginInfoEmployee);
    app.get('/getAvailability',isLoggedIn, getCtrl.getAvailability);
    //Sites
    app.get('/menu', isLoggedIn, getCtrl.getMenuSite); // html
    app.get('/overviewForAdmin', isOfficeEmp, getCtrl.getOverviewForAdminSite); // html
    app.get('/myProfile', isLoggedIn, getCtrl.getMyProfileSite); // html
    app.get('/vaktoversikt', isLoggedIn, getCtrl.getVaktoversiktSite); // html
    app.get('/calendar', isLoggedIn, getCtrl.getCalendarSite); // html
    app.get('/approvalAdmin', isOfficeEmp, getCtrl.getApprovalAdminSite); // html
    app.get('/frontpageAdmin', isOfficeEmp, getCtrl.getFrontpageAdminSite); // html
    app.get('/OnePagedMenu', isLoggedIn, getCtrl.getOnePagedMenu); // html
    app.get('/frontpageSuper', isAdmin, getCtrl.getFrontpageSuperSite); // html
    app.get('/overviewEmp', isLoggedIn, getCtrl.getOverviewEmpSite); // html
    app.get('/availability', isLoggedIn, getCtrl.getAvailabilitySite); // html
    app.get('/appeal', isLoggedIn, getCtrl.getAppeal); // html
    app.get('/adminShifts', isOfficeEmp, getCtrl.getAdminShifts); // html
    app.get('/getRequestShift/:id',isOfficeEmp,getCtrl.getRequestShift);

    //post / put
    app.post('/login', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        if(req.session.passport.user.is_admin == 1){
            res.redirect('/frontpageAdmin');
        }else {
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
                throw err;
            }else{
                res.json(res);
            }
        })
    });
    app.post('/bulkAvail', postCtrl.insertBulkAvailability /*avail.postAvail*/);

    app.post('/getEmpForShiftDateAll', isAdmin, getCtrl.getEmpForShiftDateAll);
    app.post('/getAvailableEmpForDate', isOfficeEmp, getCtrl.getAvailableEmpForDate);
    app.post('/postNewShiftsFromBulk', isOfficeEmp, shiftModel.createNewShifts);

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
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
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
