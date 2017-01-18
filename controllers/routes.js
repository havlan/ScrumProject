//routing


var express = require('express');
var getCtrl = require('./getReq');
var putCtrl = require('./putReq');
var postCtrl = require('./postReq');
var delCtrl = require('./delReq');
var testCtrl = require('./testReq');
var psSjekk = require('../middlewares/loginCheck');
var router = express.Router();

//ruting trenger ikke parameter eks: ikke blabla(req,res);
//routing does not need parameter.
// syntax - app.route(PATH).[REST METHOD](controller.controllerAccessName)

//get
router.route('/').get(getCtrl.getRoot);
router.route('/user').get(getCtrl.getUser);
router.route('/user/:id').get(getCtrl.getUser);
router.route('/login').get(getCtrl.getLoginSite);
router.route('/getEmployee').get(getCtrl.getEmployee);
router.route('/getDepartment/:department_id').get(getCtrl.getDepartment);
router.route('/getType').get(getCtrl.getType);
router.route('/getShift').get(getCtrl.getShift);
router.route('/getShift_has_employee').get(getCtrl.getShift_has_employee);
router.route('/getRequest').get(getCtrl.getRequest);
router.route('/getAbsence').get(getCtrl.getAbsence);
router.route('/getOvertime').get(getCtrl.getOvertime);
//router.route('/getUserInfo').get(getCtrl.getUserInfo);
router.route('/getVaktoversiktSite').get(getCtrl.getVaktoversiktSite);
router.route('/getVaktliste').get(getCtrl.getVaktliste);
router.route('/getEmployeeShiftsToCurrent').get(getCtrl.getEmployee_shifts_toCurrentDate);
router.route('/getEvents').get(getCtrl.getEvents);


//post / put
router.route('/login').post(getCtrl.submitLogin);
router.route('/postUser').post(postCtrl.postEmployee);
router.route('/postDepartment').post(postCtrl.postDepartment);
router.route('/postType').post(postCtrl.postType);
router.route('/postShift').post(postCtrl.postShift);
router.route('/postShift_has_employee').post(postCtrl.postShift_has_employee);
router.route('/postRequest').post(postCtrl.postRequest);
router.route('/postAbsence').post(postCtrl.postAbsence);
router.route('/postOvertime').post(postCtrl.postOvertime);
router.route('/postLogInInfo').post(postCtrl.postLogInInfo);
router.route('/updateShift_has_employee').post(postCtrl.updateShift_has_employee);
router.route('/updateEmployee').post(postCtrl.updateEmployee);
router.route('/updateType').post(postCtrl.updateType);
router.route('/updateShift').post(postCtrl.updateShift);
router.route('/updateDepartment').post(postCtrl.updateDepartment);
router.route('/updateRequest').post(postCtrl.updateRequest);
router.route('/updateAbsence').post(postCtrl.updateAbsence);
router.route('/updateOvertime').post(postCtrl.updateOvertime);
router.route('/updateLogInInfo').post(postCtrl.updateLogInInfo);
//delete


//delete

//===============  KEEP NodeETest for testing!!!  ====================
    router.route('/NodeETest').get(testCtrl.getNodeETest);
    router.route('/NodeETest/put').put(testCtrl.putNodeETest);
    router.route('/NodeETest/post').post(testCtrl.postNodeETest);
//app.route('NodeETest/post')
//======== TEST ROUTE FERDIG ========


//app.route('/*').get(getCtrl.get404);
router.route('/NodeETest').get(testCtrl.getNodeETest);
router.route('/NodeETest/put').put(testCtrl.putNodeETest);
router.route('/NodeETest/post').post(testCtrl.postNodeETest);
router.route('/Batman').get(testCtrl.getBatman);
router.route('/JustaTest').get(testCtrl.getJustaTest);
router.route('/JustaTest/put').put(testCtrl.putJustaTest);
router.route('/EmployeeOvertime').get(testCtrl.getEmployeeOvertime);


//Site
router.route('/OnePagedMenu').get(getCtrl.getOnePagedMenu);

//Sites
router.route('/login').get(getCtrl.getLoginSite);
router.route('/menu').get(getCtrl.getMenuSite);
router.route('/overviewForAdmin').get(getCtrl.getOverviewForAdminSite);
router.route('/myProfile').get(getCtrl.getMyProfileSite);
router.route('/vaktoversikt').get(getCtrl.getVaktoversiktSite);
router.route('/calendar').get(getCtrl.getCalendarSite);
router.route('/approvalAdmin').get(getCtrl.getApprovalAdminSite);
router.route('/frontpageAdmin').get(getCtrl.getFrontpageAdminSite);

//Images
router.route('/IMG01').get(getCtrl.getLogo);

//======== TEST ROUTE FERDIG ========
router.route('/Employee').get(getCtrl.get403);
router.route('/*').get(getCtrl.get404);

function isLoggedIn (req, res, next) {
    console.log(req.session);
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}
function logOut(req,res){
    req.logout();
    res.redirect('/login');
}
module.exports = router;
