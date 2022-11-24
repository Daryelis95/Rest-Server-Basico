const { request, response } = require("express");
const jwt  = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJwt = async( req = request, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }
    
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //usuario que corresponde al uid
        const usuario = await Usuario.findById({_id : uid});

        //usuario no existe
        if (!usuario) {
            return res.status(401).json({
                msg: " Token no valido - Usuario no existe en la db"
            })
        }       

        //verificar si usuario tiene estado true

        if (!usuario.estado) {
            return res.status(401).json({
                msg: " Token no valido - Usuario con estado : false"
            })
        }
       
        req.usuario = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            msg :  'Token no valido'
        })
    }
}

module.exports = {
    validarJwt
}