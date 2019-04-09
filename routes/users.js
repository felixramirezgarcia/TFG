'use strict' 

var express = require('express');
var userCrontroller = require('../controllers/users');
var router = express.Router();

router.post('/saveUser',userCrontroller.saveUser);
router.get('/getUser',userCrontroller.getUser);
router.get('/getUserEmail',userCrontroller.getUserEmail);
router.get('/getUsers',userCrontroller.getUsers);


module.exports = router;
