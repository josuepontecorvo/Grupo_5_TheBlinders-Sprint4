const jsonDB = require('../model/jsonDatabase');
const userModel = jsonDB('users');

controlador = {
    register: (req,res) => res.render('users/register'),

    store: (req,res) => {
        let user = req.body;
        if(req.file) {
            user.profileimg = req.file.filename;
        }
        else {
            user.profileimg = 'default-user.png'
        }
        userModel.create(user);

        res.redirect('/');
    },

    login: (req,res) => res.render('users/login'),

    cart: (req,res) => res.render('users/product-cart'),
};

module.exports = controlador;