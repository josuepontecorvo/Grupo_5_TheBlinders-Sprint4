const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');

const storage =  multer.diskStorage({
    destination: function (req, file, cb) { 
        let folder = path.join(__dirname,'../../public/images');
        cb(null, folder); 
     }, 
     filename: function (req, file, cb) { 
        cb(null, `product-img-${Date.now()}${path.extname(file.originalname)}`);  } 
});

const uploadFile = multer({storage});


router.get('/', productsController.products);
router.get('/detalle/:id', productsController.detail);
router.get('/editar/:id', productsController.edit);
router.get('/create', productsController.create);
router.post('/create', productsController.store);
router.delete('/:id', productsController.delete);
router.put('/:id',uploadFile.single('image'), productsController.update);

module.exports = router;