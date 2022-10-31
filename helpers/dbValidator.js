const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne( {name: rol})
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado`)
    }
}

const existeEmail = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const existeId = async( id ) => {
    const existeIdUsuario = await Usuario.findById(id);
    if (!existeIdUsuario) {
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeId
}