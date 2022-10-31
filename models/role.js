const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    name: {
        type : String,
        required : [true , 'El nombre es requerido']
    }
});

module.exports = model('Role', RoleSchema);