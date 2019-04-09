'use strict' 

var express = require('express');
var houseCrontroller = require('../controllers/house');
var router = express.Router();

router.post('/save',houseCrontroller.saveHouse);
router.get('/gethouses',houseCrontroller.getHouses);
router.get('/gethouse',houseCrontroller.getHouse);


module.exports = router;