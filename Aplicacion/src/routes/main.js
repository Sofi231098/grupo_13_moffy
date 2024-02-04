const mainController = require('../controllers/mainController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/', mainController.index);

module.exports = router;