const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

// buscar usuarios
const buscarUsuario = async( termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino); //verificar si es un id valido de mongo :true

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results : (usuario) ? [ usuario ] : []
        })
    }

    //expresion regular insencible
    const regex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
        $or:[ {nombre : regex }, { correo: regex }],
        $and:[ { estado: true } ]
    });

    res.json({
        results: usuarios
    })
}

// Buscar categorias
const buscarCategorias = async( termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const categorias = await Categoria.findById(termino);
        return res.json({
            results: (categorias) ? [ categorias ] : []
        })
    }

    //expresion regular insencible
    const regex = new RegExp( termino, 'i');

    const categorias = await Categoria.find({ name: regex, estado : true });

    res.json({
        result: categorias
    })

}

// Buscar productos
const buscarProductos = async( termino = '', res ) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const productos = await Producto.findById( termino ).populate('categoria', 'name');
        return res.json({
            results : ( productos ) ? [ productos ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find( { name : regex, estado: true }).populate('categoria', 'name');
    res.json({
        results: productos
    })
}

const buscar = async( req , res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })    
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;

        case 'productos':
            buscarProductos(termino, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Aun no existe el buscador por esa coleccion'
            });
    }
   
}

module.exports = {
    buscar
}
