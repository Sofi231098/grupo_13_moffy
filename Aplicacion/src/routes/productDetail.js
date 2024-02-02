const productDetail = require('../controllers/productDetailController');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/detalle', productDetail.productDetail);


module.exports = router;