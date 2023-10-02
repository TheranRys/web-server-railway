const express = require('express');
const cors = require('cors');

const { db_connection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //connect DB
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async conectarDB() {
        await db_connection();
    }

    middlewares(){
        // cors
        this.app.use( cors() );
        // Parser y lectura body
        this.app.use( express.json());
        //directorio publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;