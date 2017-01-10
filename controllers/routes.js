//routing


var express = require('express');
var getCtrl = require('./getReq');
var router = express.Router();

//ruting trenger ikke parameter eks: ikke blabla(req,res);
router.route('/').get(getCtrl.getRoot);
router.route('/user').get(getCtrl.getUser);
router.route('/user/:id').get(getCtrl.getUser);

module.exports = router;
