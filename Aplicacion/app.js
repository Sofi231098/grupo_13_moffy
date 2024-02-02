const express = require('express');
const path = require('path');
const app = express();

const router = express.Router();

let rutasMain = require('./src/routes/main.js');
let rutasLogin = require('./src/routes/login.js');
let rutasRegister = require('./src/routes/register.js');
let rutasProduct = require('./src/routes/product.js');
let rutasProductDetail = require('./src/routes/productDetail.js');
let rutasProductCart = require('./src/routes/productCart.js');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});

app.use('/', rutasMain);
app.use('/', rutasLogin);
app.use('/', rutasRegister);
app.use('/', rutasProduct);
app.use('/', rutasProductDetail);
app.use('/', rutasProductCart);










