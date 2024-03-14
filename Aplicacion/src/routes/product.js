const productController = require('../controllers/productController');
let express = require('express');
let router = express.Router();
const multer = require('multer');
let path = require('path');
const auth = require('../middlewares/auth');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

/*** GET ALL PRODUCTS ***/
router.get('/', productController.product);

/*** CREATE ONE PRODUCT ***/
router.get('/create', auth, productController.productRegister);
router.post('/', upload.single('image'), productController.productStore);

/*** GET ONE PRODUCT ***/
router.get('/:id', productController.productDetail);


/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', auth, productController.productEdit);
router.put('/:id', upload.single('image'), productController.productUpdate);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', productController.productDelete);

module.exports = router;