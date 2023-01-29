const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarImg, actualizarArchivoCloudinary } = require('../../controllers/uploads');
const { colecionPermitidas } = require('../../helpers');
const { validarCampos, validarArchivo } = require('../../middlewares');

const colecciones = ['usuarios', 'productos'];

class UploadRouter {
    baseUrl = '/uploads'
    router = Router();
    constructor () {
        this.rutas();
    }

    rutas(){

        this.router.post('/', validarArchivo ,cargarArchivo);
        this.router.put('/:coleccion/:id', [
            validarArchivo,
            check('id', 'No es un id valido de mongo').isMongoId(),
            check('coleccion').custom(c => colecionPermitidas(c, colecciones)),
            validarCampos
        ], actualizarArchivoCloudinary);
        this.router.get('/:coleccion/:id', [
            check('id', 'No es un id valido de mongo').isMongoId(),
            check('coleccion').custom( c => colecionPermitidas(c, colecciones)),
            validarCampos
        ], mostrarImg)
    }
}


module.exports = new UploadRouter();
