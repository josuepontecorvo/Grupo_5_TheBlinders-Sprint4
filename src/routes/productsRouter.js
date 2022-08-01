const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multerMiddleware = require('../middleware/multer')
const uploadFile = multerMiddleware('images','product');


router.get('/', productsController.products);
router.post('/filtrar', productsController.filter);
router.get('/detalle/:id', productsController.detail);
router.get('/editar/:id', productsController.edit);
router.get('/create', productsController.create);
router.post('/create',uploadFile.array('image'), productsController.store);
router.delete('/:id', productsController.delete);
router.put('/:id',uploadFile.array('image'), productsController.update);

module.exports = router;