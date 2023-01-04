const { Router, response } = require('express');
const { check } = require('express-validator');

const {
    crearProducto,
    getProductos,
    getProductoId,
    putProducto,
    deleteProducto
} = require('../controllers/productos');

const {
    existeIdCategory,
    existeIdProducto
} = require('../helpers/dbValidator');

const {
    validarJwt,
    validarCampos,
    validarRoles
} = require('../middlewares');

const router = Router();

router.get('/', getProductos);

router.get('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeIdProducto),
    validarCampos
], getProductoId);

router.post('/', [
    validarJwt,
    check('name', 'El name es requerido').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeIdCategory),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJwt,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeIdProducto),
    check('name', 'El name es requerido').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeIdCategory),
    validarCampos
], putProducto);

router.delete('/:id', [
    validarJwt,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeIdProducto),
    validarRoles('ADMIN_ROLE'),
    validarCampos
], deleteProducto)
module.exports = router;
