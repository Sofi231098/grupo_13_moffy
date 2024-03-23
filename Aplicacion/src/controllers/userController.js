const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const usuarios = require('../data/usersDataBase.json');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const userController = {
    login: (req, res) => {
        return res.render('users/login');
    },
    processLogin: (req, res) => {
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped(),
            });
        }
        let userToLogin = usuarios.find(user => user.email === req.body.email);
        if (userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                let userToSession = { ...userToLogin };
                delete userToSession.password;
                req.session.user = userToSession;
                if (req.body.remember) {
                    res.cookie('userEmail', userToSession.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                }
                return res.redirect('/');
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    storeUser: (req, res) => {
        if (validationResult(req).errors.length > 0) {
            return res.render('users/register', {
                errors: validationResult(req).mapped(),
                old: req.body
            });
        } else {
            let user = {
                id: crypto.randomUUID(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                category: "user",
                image: req.file.filename || "default.jpg",
            };
            usuarios.push(user);
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, 2));
            res.redirect('/login');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        return res.redirect('/');
    }
}

module.exports = userController;