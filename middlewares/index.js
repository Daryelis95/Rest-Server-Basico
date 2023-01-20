const validarCampos  = require('../middlewares/validarCampos');
const validarJwt  = require('../middlewares/validarJwt');
const validarRoles = require('../middlewares/validarRol');
const validarArchivo = require('../middlewares/validarArchivo');

module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRoles,
    ...validarArchivo
}