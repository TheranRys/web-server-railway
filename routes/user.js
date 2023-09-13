
const { Router } = require('express');

const { usuariosGet,
         usuariosPut,
         usuariosPost,
         usuariosDelete,
         usuariosPatch 
        } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

/*router.get('/', (req, res) => {
    res.json({
      msg: 'get API'
  });
});*/
router.put('/:id', usuariosPut);
router.post('/', usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);





module.exports = router;