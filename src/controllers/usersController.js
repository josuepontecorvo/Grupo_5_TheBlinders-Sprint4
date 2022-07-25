const jsonDB = require('../model/jsonDatabase');
const userModel = jsonDB('users');

controlador = {
    register: (req,res) => res.render('users/register'),

    store: (req,res) => {
        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            profileimg: req.body.profileimg
        }
        userModel.create(user);

        res.redirect('/');
    },

    login: (req,res) => res.render('users/login'),

    cart: (req,res) => res.render('users/product-cart'),
};

module.exports = controlador;