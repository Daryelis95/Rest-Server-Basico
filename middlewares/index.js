const validarCampos  = require('../middlewares/validarCampos');
const validarJwt  = require('../middlewares/validarJwt');
const validarRoles = require('../middlewares/validarRol');

module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRoles
}