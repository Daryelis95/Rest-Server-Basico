const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarImg, actualizarArchivoCloudinary } = require('../controllers/uploads');
const { colecionPermitidas } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');

const colecciones = ['usuarios', 'productos'];

const router = Router();

router.post('/', validarArchivo ,cargarArchivo);
router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('coleccion').custom(c => colecionPermitidas(c, colecciones)),
    validarCampos
], actualizarArchivoCloudinary);
router.get('/:coleccion/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('coleccion').custom( c => colecionPermitidas(c, colecciones)),
    validarCampos
], mostrarImg)

module.exports = router;
