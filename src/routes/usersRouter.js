const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multerMiddleware = require('../middleware/multer')
const uploadFile = multerMiddleware('images/users',"user");


router.get('/', usersController.list);
router.get('/detalle/:id', usersController.detail);
router.get('/registro', usersController.register);
router.post('/registro', uploadFile.array('profileimg'), usersController.store);
router.get('/ingresar', usersController.login);
router.get('/carrito', usersController.cart);
router.get('/editar/:id', usersController.edit);
router.put('/editar/:id',uploadFile.array('profileimg'), usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;