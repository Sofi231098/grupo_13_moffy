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
};

module.exports = mainController;