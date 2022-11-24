const { Router } = require('express');

const { check } = require('express-validator');
const { esRoleValido, existeEmail, existeId } = require('../helpers/dbValidator');

const {
    validarCampos,
    validarJwt,
    validarRoles
} = require('../middlewares')

const {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
} = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], postUsuario);
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(esRoleValido),
    validarCampos
], putUsuario);

router.delete('/:id', [
    validarJwt,
    //validarRole,
    validarRoles('ADMIN_ROLE', 'VENTA_ROLE', 'DAY_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
], deleteUsuario);

module.exports = router;
