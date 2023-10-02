const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
//const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {

    // const query = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = ({estado: true});

    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));*/

    //const total = await Usuario.count(query);

    const [total,usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.count(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        //msg: 'get API - usuariosGet',
        //total,
        //usuarios
        total,
        usuarios
    });
}
const usuariosPut = async (req, res = response) => {

    const {id} = req.params.id;
    const { _id, password, google,correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}
const usuariosPost = async (req, res = response) => {
    /*if (!req.body){
        return res.status(400).json({
            msg: '...'
        })
    }*/
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //DB
    await usuario.save();

    res.json({
        //msg: 'post API - usuariosPost',
        usuario
    });
}
const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    //const uid = req.uid;

    // borrado fisico
    /*const usuario = await Usuario.findByIdAndDelete(id);*/
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    const usuarioAutenticado = req.usuario;

    res.json({usuario,usuarioAutenticado});
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost,
    usuariosPatch
}