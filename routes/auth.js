const { Router } = require('express');
const {validarCampos} = require('../middlewares/validarCampos')

const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatorio').not().isEmpty(),
    validarCampos
] , login)

module.exports = router;