const { response } = require('express');
const bcrytjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { correo , password } = req.body;

    //verificar si usuario existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        return res.status(400).json({
            msg: 'Usuario incorrecto'
        })
    }
    //verificaar si esta activo
    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario desabilitado'
        })
    }
    //verificar contrasena
    const validPassword = bcrytjs.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Contrasena incorrecta'
        })
    }

    //Generar jwt
    const token = await generarJWT(usuario.id);

    res.status(200).json({
        usuario,
        token
    })
} 

module.exports = {
    login
}