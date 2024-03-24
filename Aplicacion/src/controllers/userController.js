const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const usuarios = require('../data/usersDataBase.json');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const userLogsPath = path.join(__dirname, '../logs/userLogs.txt');

const logUserActivity = async (message) => {
    const log = `${message} a las ${new Date().toLocaleString()}\n`;
    try {
        await fs.promises.appendFile(userLogsPath, log);
    } catch (error) {
        console.error('Error writing to log file', error);
    }
};

const userController = {
    login: (req, res) => {
        return res.render('users/login');
    },
    processLogin: async (req, res) => {
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
                await logUserActivity(`El usuario ${userToSession.email} inició sesión`);
                return res.redirect('/profile');
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
    storeUser: async (req, res) => {
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
            await logUserActivity(`Se creó la cuenta: ${user.email}`);
            res.redirect('/login');
        }
    },
    logout: async (req, res) => {
        await logUserActivity(`El usuario: ${req.session.user.email} cerró sesión`);
        req.session.destroy();
        res.clearCookie('userEmail');
        return res.redirect('/');
    },
    profile: (req, res) => {
        return res.render('users/userProfile', {user: req.session.user});
    }
}

module.exports = userController;