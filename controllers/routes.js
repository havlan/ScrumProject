//routing


var express = require('express');
var getCtrl = require('./getReq');
var router = express.Router();

//ruting trenger ikke parameter eks: ikke blabla(req,res);
router.route('/').get(getCtrl.getRoot);
router.route('/user').get(getCtrl.getUser);
router.route('/user/:id').get(getCtrl.getUser);
router.route('/login').get(getCtrl.getLogin);
//===============  HOLD NodeETest for testing!!!  ====================
router.route('/NodeETest/').get(getCtrl.getNodeETest);
router.route('/NodeETEst/put').get(getCtrl.putNodeETest);
//======== TEST ROUTE FERDIG ========
router.route('/*').get(getCtrl.get404);

module.exports = router;
