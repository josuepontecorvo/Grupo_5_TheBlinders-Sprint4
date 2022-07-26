const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');

const storage =  multer.diskStorage({
    destination: function (req, file, cb) { 
        let folder = path.join(__dirname,'../../public/images/users');
        cb(null, folder); 
     }, 
     filename: function (req, file, cb) { 
        cb(null, `user-img-${Date.now()}${path.extname(file.originalname)}`);  } 
});

const uploadFile = multer({storage});

router.get('/registro', usersController.register);
router.post('/registro', uploadFile.single('profileimg'), usersController.store);
router.get('/ingresar', usersController.login);
router.get('/carrito', usersController.cart);

module.exports = router;