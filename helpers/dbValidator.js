const { 
    Categoria,
    Usuario,
    Role,
    Producto
} = require('../models');

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

const existeIdCategory = async( id ) => {
    const existeIdCategory = await Categoria.findById(id);
    if (!existeIdCategory) {
        throw new Error(`El id: ${id} no existe`);
    }
}

const existeIdProducto = async(id) => {
    const existeIdProducto = await Producto.findById(id);
    if (!existeIdProducto) {
        throw new Error(`El id: ${id} no existe`);
    }
}

const existId = async(id, model) => {
    const existeIdProducto = await model.findById(id);
    if (!existeIdProducto) {
        throw new Error(`El id: ${id} no existe`);
    }
}

const colecionPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida - Permitidas: ${colecciones}`)
    }

    return true;
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeId,
    existeIdCategory,
    existeIdProducto,
    existId,
    colecionPermitidas
}
