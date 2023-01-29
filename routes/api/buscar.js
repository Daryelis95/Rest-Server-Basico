const { Router } = require('express');
const { buscar } = require('../../controllers/buscar');

class BuscarRouter {
    baseUrl = '/buscar';
    router = Router();
    constructor () {
        this.rutas();
    }

    rutas() {

        this.router.get('/:coleccion/:termino', buscar);
    }
}


module.exports = new BuscarRouter();
