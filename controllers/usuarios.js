const { request, response } = require('express');

const getUsuarios = (req = request, res = response) => {
    const {nombre, apellido} = req.query;
    res.json({
        'msg':'Hello World - controlador',
        nombre,
        apellido
    });
}

const postUsuario = (req = request, res = response) => {
    const body = req.body;

    res.json({
        'msg':'Post user -controller',
        body
    });
}

const putUsuario = (req = request, res = response) => {
    const {id} = req.params;

    res.json({
        'msg':'Put user - controller',
        id
    });
}

const deleteUsuario = (req = request, res = response) => {
    const {id} = req.params;

    res.json({
        'msg':'Delete user - controller',
        id
    })
}
module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}
