const jsonDB = require('../model/jsonDatabase');
const path = require('path');
const fs = require('fs');
const userModel = jsonDB('users');


controlador = {
    list: (req,res) =>{ 
        let users = userModel.readFile();     
        res.render('users/user-index',{users});
    },

    detail: (req,res) => { 
        const id = +req.params.id;
        const user = userModel.find(id);    
        res.render('users/userDetail', {user});
    },

    register: (req,res) => res.render('users/register'),

    store: (req,res) => {
        let user = req.body;
        let imagenes= []
        for(let i = 0 ; i<req.files.length;i++) {
            imagenes.push(req.files[i].filename)
        }
        user.profileimg = imagenes.length > 0 ? imagenes : ['default-user.png'];
        if(user.password == user["user-confirm-password"] ) {
            delete user["user-confirm-password"];
            userModel.create(user);
    
            res.redirect('/');
        } else {
            alert('Verifique que coincida la validación de la contraseña')
            res.redirect('/usuarios/editar/'+user.id);
        }
       
    },

    login: (req,res) => res.render('users/login'),

    cart: (req,res) => res.render('users/product-cart'),

    edit: (req,res) => { 
        const id = +req.params.id;
        const user = userModel.find(id);    
        res.render('users/userEdit',{user});
    },

    update: (req,res) => {
        let idToUpdate = req.params.id;
        let dataUpdate = req.body;
        const user = userModel.find(idToUpdate);   
        let imagenes= []
        for(let i = 0 ; i<req.files.length;i++) {
            imagenes.push(req.files[i].filename)
        }
        dataUpdate.profileimg = imagenes.length > 0 ? imagenes : user.profileimg;

        if(dataUpdate.password != "") {
            if(dataUpdate.password == dataUpdate["user-confirm-password"] ) {
                delete dataUpdate["user-confirm-password"];
                let userUpdate = {
                    id: idToUpdate,
                    ...dataUpdate,
                }
                userModel.update(userUpdate);
                res.redirect('/usuarios');
            } else {
                alert('Verifique que coincida la validación de la contraseña')
                res.redirect('/usuarios/editar/'+user.id);
            }
        } else {
            delete dataUpdate["user-confirm-password"];
            dataUpdate.password = user.password;
            let userUpdate = {
                id: idToUpdate,
                ...dataUpdate,
            }
            userModel.update(userUpdate);
            res.redirect('/usuarios');
        }


        
    },

    delete: (req,res) => {
        let idToDelete = req.params.id;
        let user = userModel.find(idToDelete);
        for (let i = 0; i < user.profileimg.length; i++) {
            let pathToImage = path.join(__dirname, '../../public/images/users/'+ user.profileimg[i]);
            fs.unlinkSync( pathToImage );
        }
        userModel.delete(idToDelete);
        res.redirect('/');
    },

};

module.exports = controlador;