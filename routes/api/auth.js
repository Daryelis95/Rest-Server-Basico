const { Router } = require('express');
const {validarCampos} = require('../../middlewares/validarCampos')

const { check } = require('express-validator');
const { login, googleSignIn } = require('../../controllers/auth');

class AuthRouter {

    baseUrl = '/auth';
    router = Router();

    constructor(){
        this.rutas();
    }

    rutas = () => {

        this.router.post('/login', [
            check('correo', 'El correo es obligatorio').isEmail(),
            check('password', 'La contrasena es obligatorio').not().isEmpty(),
            validarCampos
        ], login);

        this.router.post('/google', [
            check('id_token', 'id_token es necesarios').not().isEmpty(),
            validarCampos
        ] , googleSignIn)
        
    }
}
module.exports =  new AuthRouter();
