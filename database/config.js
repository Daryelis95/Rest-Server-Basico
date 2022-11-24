const mongoose = require('mongoose');

const dbconnection = async() => {
    try {
        
        await mongoose.connect(process.env.MOGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = {
    dbconnection
}