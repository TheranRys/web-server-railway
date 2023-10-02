
const { Router } = require('express');
const { check } = require('express-validator');

//const Role = require('../models/role');

const {esRolValido, emailExiste, existeUsuarioXId} = require('../helpers/db-validators');

const { usuariosGet,
         usuariosPut,
         usuariosPost,
         usuariosDelete,
         usuariosPatch 
        } = require('../controllers/user');

/*const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');*/
const {validarCampos,validarJWT,esAdminRole,tieneRole} = require('../middlewares')

const router = Router();

router.get('/', usuariosGet);

/*router.get('/', (req, res) => {
    res.json({
      msg: 'get API'
  });
});*/
router.put('/:id',[
  check('id', 'no es un id valido').isMongoId(),
  check('id').custom( existeUsuarioXId ),
  check('rol').custom( esRolValido ),
  validarCampos
], usuariosPut);

router.post('/',[
  check('nombre', 'El nombre no es valido').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  check('password', 'La contraseña no es valida').isLength({min:6}),
  //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom( esRolValido ),//(rol) => esRolValido(rol)
  validarCampos
], usuariosPost);

router.delete('/:id',[
  validarJWT,
  // fuerza q el usuario sea administrador
  //esAdminRole,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id', 'no es un id valido').isMongoId(),
  check('id').custom( existeUsuarioXId ),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;