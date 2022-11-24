const express = require('express');
var cors = require('cors');
const { dbconnection } = require('../database/config');

class Serve {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.auth = '/api/auth';

        //conectar a base de datos
        this.conactarDB();
        
        //middlewares
        this.middlewares();
        
        //Ruta
        this.routes();
    }

    async conactarDB(){
        await dbconnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        
        //lectura y parseo de body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.auth, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Serve;
