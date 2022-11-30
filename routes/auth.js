const { Router } = require('express');
const {validarCampos} = require('../middlewares/validarCampos')

const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatorio').not().isEmpty(),
    validarCampos
] , login)

router.post('/google', [
    check('id_token', 'id_token es necesarios').not().isEmpty(),
    validarCampos
] , googleSignIn)

module.exports = router;