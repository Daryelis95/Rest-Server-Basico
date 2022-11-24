const { request, response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado : true };

    const [ total , usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
}

const postUsuario = async(req = request, res = response) => {

    const { nombre, password, correo, rol} = req.body;
    const usuario = new Usuario( {nombre, password, correo, rol} );

    //encriptar clave
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar

    usuario.save();

    res.json({
        'msg':'Usuario creado con exito',
        usuario
    });
}

const putUsuario = async(req = request, res = response) => {
    const {id} = req.params;
    const { _id, password , google, correo, ...resto} = req.body;

    if (password) {
        //encriptar clave
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id , resto);
    res.json({
        'msg': 'Usuario actualizado correctamente',
        usuario
    });
}

const deleteUsuario = async(req = request, res = response) => {
    const {id} = req.params;

    const usuarioAutenticado = req.usuario;
    //eliminacion fisica
    //const usuario = await Usuario.findByIdAndDelete(id);

    //eliminacion logica
    const usuario = await Usuario.findByIdAndUpdate( id , { estado : false} );

    res.json({
        'msg':'Usuario eliminado con exito',
        usuario,
        usuarioAutenticado
        
    })
}
module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}
