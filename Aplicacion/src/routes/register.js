const registerController = require('../controllers/registerController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/registro', registerController.register);

module.exports = router;