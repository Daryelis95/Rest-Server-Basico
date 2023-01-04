const { Router } = require('express');
const { check } = require('express-validator');
const { 
    postCategoria,
    getCategoriaId,
    getCategorias,
    putCategoria, 
    deleteCategoria
} = require('../controllers/categorias');
const { existeIdCategory } = require('../helpers/dbValidator');

const { validarCampos, validarJwt, validarRoles } = require('../middlewares');

const router = Router();

//obtener categorias - publica
router.get('/', getCategorias);

//obtener categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdCategory),
    validarCampos
], getCategoriaId);

//Crear categoria - privado - calquiera con token valido
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCategoria);

//Actualizar - privado - calquiera con token valido
router.put('/:id', [
    validarJwt,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdCategory),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putCategoria);

//Eliminar categoria -Admin
router.delete('/:id', [
    validarJwt,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdCategory),
    validarRoles('ADMIN_ROLE'),
    validarCampos
] , deleteCategoria);

module.exports = router;
