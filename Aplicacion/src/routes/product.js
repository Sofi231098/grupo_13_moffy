const productController  = require('../controllers/productController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/productos', productController.product);

module.exports = router;