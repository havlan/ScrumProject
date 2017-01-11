//routing


var express = require('express');
var getCtrl = require('./getReq');
var putCtrl = require('./putReq');
var delCtrl = require('./delReq');
var testCtrl = require('./testReq');
var router = express.Router();

//ruting trenger ikke parameter eks: ikke blabla(req,res);
router.route('/').get(getCtrl.getRoot);
router.route('/user').get(getCtrl.getUser);
router.route('/user/:id').get(getCtrl.getUser);
router.route('/login').get(getCtrl.getLogin);


//===============  HOLD NodeETest for testing!!!  ====================
router.route('/NodeETest').get(testCtrl.getNodeETest);
router.route('/NodeETest/put').get(testCtrl.putNodeETest);
router.route('/NodeETest/post').get(testCtrl.postNodeETest);
//router.route('NodeETest/post')
//======== TEST ROUTE FERDIG ========


router.route('/*').get(getCtrl.get404);

module.exports = router;
