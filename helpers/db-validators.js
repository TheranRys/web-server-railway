const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
      throw new Error(`El rol ${rol} no esta asignado`)
    }
  }

//verificar el correo
const emailExiste = async( correo = '') => {
  const existeEmail = await Usuario.findOne({ correo: correo});
  if (existeEmail){
      throw new Error(`Ese correo ya esta en uso`)
    }
  }

const existeUsuarioXId = async( id = '') => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario){
      throw new Error(`Ese id no existe: ${ id }`);
    }
  }
  
module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioXId

  }