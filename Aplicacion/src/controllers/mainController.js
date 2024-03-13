const { validationResult } = require('express-validator');
const usuarios = require('../data/usersDataBase.json');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const bcrypt = require('bcryptjs');

const mainController = {
    index: (req, res) => {
        return res.render('home');
    },
    login: (req,res) =>{
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    storeUser: (req, res) => {
        if(validationResult(req).errors.length > 0){
            console.log("Errores de validación: ", validationResult(req).errors);
            return res.render('users/register');
        }else{
            console.log("Usuario creado correctamente:");
            const user = {
                id: crypto.randomUUID(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                category: "user",
                image: "default.jpg",
            };
            usuarios.push(user);
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, 2));
            res.redirect('/login');
        }
    },
    processLogin: (req, res) => {
        if(validationResult(req).errors.length > 0){
            console.log("Errores de validación: ", validationResult(req).errors);
            return res.render('users/login');
        }else{
            const email = req.body.email;
            const password = req.body.password;
            const user = usuarios.find(user => user.email === email);
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    delete user.password;
                    req.session.user = user;

                    return res.redirect('/');
                }
            
            }
        }
    },
};

module.exports = mainController;