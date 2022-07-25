const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/registro', usersController.register);
router.get('/ingresar', usersController.login);
router.get('/carrito', usersController.cart);

module.exports = router;