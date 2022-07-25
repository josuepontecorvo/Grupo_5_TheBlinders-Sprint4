const fs = require('fs');
const path = require('path');
const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');

controller = {

    products: (req,res) => {
        const products = productModel.readFile();
        res.render('products/products', {products})
    },

    detail: (req,res) => { 
        const id = +req.params.id;
        const product = productModel.find(id);    
        res.render('products/productDetail', {product})
    },

    create: (req,res) => res.render('products/productCreate'),

    store: (req, res) => {
        let product = {
            product: req.body.product,
            type: req.body.type,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            discount: req.body.discount,
            brand: req.body.brand,
            model: req.body.model,
            size: req.body.size,
            color: req.body.color,
            rolled: req.body.rolled,
            frame: req.body.frame,
            shifter: req.body.shifter,
            brakes: req.body.brakes,
            suspension: req.body.suspension,
            cubiertas: req.body.cubiertas,
            info: req.body.info
        }
        productModel.create(product);

        res.redirect('/productos')
    },

    edit: (req,res) => { 
        const id = +req.params.id;
        const product = productModel.find(id);    
        res.render('products/productEdit',{product});
    },

    delete: (req,res) => {
        let idToDelete = req.params.id;
        productModel.delete(idToDelete);
        res.redirect('/productos');
    },

    update: (req,res) => {
        let idToUpdate = req.params.id;
        let dataUpdate = req.body;
        dataUpdate.image = req.file.filename;
        console.log(req.file);
        let productUpdate = {
            id: idToUpdate,
            ...dataUpdate,
        }
        productModel.update(productUpdate);
        res.redirect('/productos');
    },
};

module.exports = controller;