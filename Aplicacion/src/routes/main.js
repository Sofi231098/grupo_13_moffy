const {check} = require('express-validator');
const mainController = require('../controllers/mainController');
let express = require('express');
let router = express.Router();
let path = require('path');

let validateUser = [
    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('repeatPassword')
        .notEmpty().withMessage('Debes repetir la contraseña').bail()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    check('usuario').notEmpty().withMessage('Debes ingresar tu nombre de usuario').bail()
];

let validateUserLogin = [
    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
];

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.post('/login', validateUserLogin, mainController.processLogin);
router.get('/registro', mainController.register);
router.post('/registro', validateUser, mainController.storeUser);

module.exports = router;