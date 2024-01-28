const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});

app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/home.html'));
});

app.get('/detalle', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/productDetail.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/register.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/products.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/productCart.html'));
});