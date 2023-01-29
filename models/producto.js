const { Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es requerido']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: Number,
        default: 5
    },
    img: {
        type: String
    }
});

//excluir campos
ProductSchema.methods.toJSON = function() {
    const {__v, _id, ...producto} = this.toObject();
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', ProductSchema);
