const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    name: {
        type : String,
        required : [true , 'El nombre es requerido']
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
    }
});

//excluir campos
CategoriaSchema.methods.toJSON = function(){
    const {__v, _id, ...categoria} = this.toObject();
    categoria.uid = _id
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);