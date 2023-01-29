const { response, json } = require("express");
const { Producto } = require("../models");

const getProductos = async (req, res = response) => {

    const { limit = 5, desde = 0} = req.query;
    const query = { estado : true };

    const [ total , productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'name')
        .skip(Number(desde))
        .limit(Number(limit))
    ]) 

    res.json({
        total,
        productos
    });

}

const getProductoId = async (req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'name');
    
    res.json(producto);
}

const crearProducto = async(req , res = response) => {

    const { estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({ name: body.name });

    //validar si existe categoria
    if ( productoDB ) {
        return res.status(400).json({
            msg : `El product ${productoDB.name}, ya existe`
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        usuario: req.usuario._id
    }
    
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

const putProducto = async(req, res = response) => {
    const { estado, usuario, ...body} = req.body;
    const { id } = req.params;

    body.name = body.name.toUpperCase();
    body.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id , body , {new : true});

    res.json(producto);
}

const deleteProducto = async(req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id , {estado : false} , {new : true});

    res.json(producto);
}

module.exports = {
    crearProducto,
    getProductos,
    getProductoId,
    putProducto,
    deleteProducto
}
