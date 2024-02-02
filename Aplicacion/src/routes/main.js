const mainController = require('../controllers/mainController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/home', mainController.index);

module.exports = router;