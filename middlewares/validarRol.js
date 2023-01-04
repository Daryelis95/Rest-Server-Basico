const { request, response } = require("express")


const validarRole = (req = request, res = response, next) => {
    
    if (!req.usuario) {
        res.status(500).json({
            msg: 'No sea validado el token'
        });
    }

    const { nombre , rol} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            msg : `${nombre} no es administrador - No puede realizar esta accion`
        })
    }

    next();
}

const validarRoles = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.usuario) {
            res.status(500).json({
                msg: 'No sea validado el token'
            });
        }
        
        if (!roles.includes(req.usuario.rol)) {

            res.status(401).json({
                msg : `Para realizar esta accion se requiere alguno de estos roles: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    validarRole,
    validarRoles
}