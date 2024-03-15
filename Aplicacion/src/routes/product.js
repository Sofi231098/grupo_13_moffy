const productController = require('../controllers/productController');
const multer = require('multer');
let express = require('express');
let router = express.Router();
let path = require('path');

const authMiddleware = require('../middlewares/authMiddleware');

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
router.get('/create', authMiddleware, productController.productRegister);
router.post('/', upload.single('image'), productController.productStore);

/*** GET ONE PRODUCT ***/
router.get('/:id', productController.productDetail);


/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', authMiddleware, productController.productEdit);
router.put('/:id', upload.single('image'), productController.productUpdate);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', productController.productDelete);

module.exports = router;