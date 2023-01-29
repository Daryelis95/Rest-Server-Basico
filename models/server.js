const express = require('express');
var cors = require('cors');
const { dbconnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const apiRouter = require('../routes/apiRouter');

class Serve {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            'auth': '/api/auth',
            'buscar': '/api/buscar',
            'categorias': '/api/categorias',
            'productos': '/api/productos',
            'uploads': '/api/uploads',
            'usuarios': '/api/usuarios',
        }

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

    // routes() {
    //     this.app.use(this.paths.auth, require('../routes/auth'));
    //     this.app.use(this.paths.buscar, require('../routes/buscar'));
    //     this.app.use(this.paths.categorias, require('../routes/categorias'));
    //     this.app.use(this.paths.productos, require('../routes/productos'));
    //     this.app.use(this.paths.uploads, require('../routes/uploads'));
    //     this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    // }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Serve;
