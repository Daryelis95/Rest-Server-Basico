const { Router } = require('express');
const AuthRouter = require('./api/auth');

const routers = [
    AuthRouter
]

const router = Router();

routers.forEach(route => router.use(route.baseUrl, route.router));

module.exports = router;