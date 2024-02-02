const productCartController = require('../controllers/productCartController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/carrito', productCartController.productCart);

module.exports = router;