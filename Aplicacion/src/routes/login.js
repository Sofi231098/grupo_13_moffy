const loginController = require('../controllers/loginController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/login', loginController.login);

module.exports = router;