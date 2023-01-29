const { Router } = require('express');
const AuthRouter = require('./api/auth');
const UsuariosRouter = require('./api/usuarios');
const CategoriaRouter = require('./api/categorias');
const ProductoRouter = require('./api/productos');
const UploadRouter = require('./api/uploads');
const BuscarRouter = require('./api/buscar');

const routers = [
    AuthRouter,
    UsuariosRouter,
    CategoriaRouter,
    ProductoRouter,
    UploadRouter,
    BuscarRouter
]

const router = Router();

routers.forEach(route => router.use(route.baseUrl, route.router));

module.exports = router;