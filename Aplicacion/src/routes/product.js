const productController  = require('../controllers/productController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/productos', productController.product);
router.get('/productos/registro', productController.productRegister);
router.get('/productos/editar/:id', productController.productEdit);

module.exports = router;