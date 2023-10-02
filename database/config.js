const mongoose = require('mongoose');

const db_connection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos online');

    } catch (error){
        console.log(error);
        throw new Error('Error al iniciar base de datos');
    }
}

module.exports = {
    db_connection
}
