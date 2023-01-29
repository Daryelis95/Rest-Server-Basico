const express = require('express');
var cors = require('cors');
const { dbconnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const apiRouter = require('../routes/apiRouter');

class Serve {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //conectar a base de datos
        this.conactarDB();
        
        //middlewares
        this.middlewares();
        
        //Ruta
        this.app.use('/api', apiRouter);
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

        //manejar carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Serve;
