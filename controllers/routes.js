//routing


var express = require('express');
var getCtrl = require('./getReq');
var putCtrl = require('./putReq');
var postCtrl = require('./postReq');
var delCtrl = require('./delReq');
var testCtrl = require('./testReq');
var router = express.Router();

//ruting trenger ikke parameter eks: ikke blabla(req,res);
//routing does not need parameter.
// syntax - router.route(PATH).[REST METHOD](controller.controllerAccessName)

//get
router.route('/').get(getCtrl.getRoot);
router.route('/user').get(getCtrl.getUser);
router.route('/user/:id').get(getCtrl.getUser);
router.route('/login').get(getCtrl.getLogin);
router.route('/getEmployee').get(getCtrl.getEmployee);
router.route('/getDepartment/:department_id').get(getCtrl.getDepartment);
router.route('/getType').get(getCtrl.getType);
router.route('/getShift').get(getCtrl.getShift);
router.route('/getShift_has_employee').get(getCtrl.getShift_has_employee);
router.route('/getRequest').get(getCtrl.getRequest);
router.route('/getAbsence').get(getCtrl.getAbsence);
router.route('/getOvertime').get(getCtrl.getOvertime);
router.route('/getUserInfo').get(getCtrl.getUserInfo);

//router.route('/getVaktoversikt').get(getCtrl.getVaktoversikt);


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



//===============  KEEP NodeETest for testing!!!  ====================
router.route('/NodeETest').get(testCtrl.getNodeETest);
router.route('/NodeETest/put').put(testCtrl.putNodeETest);
router.route('/NodeETest/post').post(testCtrl.postNodeETest);
router.route('/Batman').get(testCtrl.getBatman);
router.route('/JustaTest').get(testCtrl.getJustaTest);
router.route('/JustaTest/put').put(testCtrl.putJustaTest);
router.route('/JustaTest').post(testCtrl.postJustaTest);
//router.route('NodeETest/post')
//======== TEST ROUTE FERDIG ========


router.route('/*').get(getCtrl.get404);
router.route('/login').get(getCtrl.getLogin);
router.route('/troll').get(getCtrl.getTroll);
router.route('/menu').get(getCtrl.getMenu);
router.route('/overviewForAdmin').get(getCtrl.getOverviewForAdmin);
router.route('/myProfile').get(getCtrl.getMyProfile);



//===============  HOLD NodeETest for testing!!!  ====================
router.route('/NodeETest').get(testCtrl.getNodeETest);
router.route('/PersonalInfo').get(testCtrl.getPersonalInfo);
router.route('/NodeETest/put').get(testCtrl.putNodeETest);
router.route('/NodeETest/post').get(testCtrl.postNodeETest);
router.route('/EmployeeOvertime').get(testCtrl.getEmployeeOvertime);
//router.route('NodeETest/post')
//======== TEST ROUTE FERDIG ========


router.route('/*').get(getCtrl.get404);

module.exports = router;
