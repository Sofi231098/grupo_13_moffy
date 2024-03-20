const userController = require('../controllers/userController');
const { check } = require('express-validator');
const multer = require('multer');
let express = require('express');
let router = express.Router();
let path = require('path');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

let validateUserLogin = [
    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

let validateUser = [
    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('usuario').notEmpty().withMessage('Debes ingresar tu nombre de usuario').bail(),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('repeatPassword')
        .notEmpty().withMessage('Debes repetir la contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
];

router.get('/logout', userController.logout);
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validateUserLogin, userController.processLogin);
router.get('/registro', guestMiddleware, userController.register);
router.post('/registro', upload.single('image'), validateUser, userController.storeUser);
router.get("/profile", authMiddleware, userController.profile);
module.exports = router;