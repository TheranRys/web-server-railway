var { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - usuariosGet',
        query
    });
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}
const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - usuariosDelete'
    });
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