const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.products);
router.get('/detalle/:id', productsController.detail)
router.get('/editar/:id', productsController.edit)
router.get('/create', productsController.create)
router.post('/create', productsController.store)

module.exports = router;