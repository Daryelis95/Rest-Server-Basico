const { response } = require("express");
const { Categoria } = require('../models')

//obtener categorias -paginado -total- populate
const getCategorias = async (req, res = response) => {

    const { limit = 2 , desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limit))
    ])
    res.json({
        total,
        categorias
    });
}

//obtener categoria por id
const getCategoriaId = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    if (!categoria.estado) {
        return res.status(400).json({
            msg : `Categoria desactivada`
        })
    }

    res.status(200).json(categoria)
}

//obtener categoria - popule
const postCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ name : nombre});

    //validar si existe categoria
    if ( categoriaDB ) {
        return res.status(400).json({
            msg : `La categoria ${categoriaDB.name}, ya existe`
        })
    }

    //generar data a guardar
    const data = {
        name : nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}

//actualizar categoria
const putCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria);

}

//eliminar categoria cambiando estado: false
const deleteCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        categoria
    })
}

module.exports = {
    postCategoria,
    getCategoriaId,
    getCategorias,
    putCategoria,
    deleteCategoria
}