const express = require('express');
const path = require('path');
const app = express();

const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const rutasMain = require('./src/routes/main.js');
const rutasProduct = require('./src/routes/product.js');
const rutasProductCart = require('./src/routes/productCart.js');



// ************ Middlewares - (don't touch) ************
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});

app.use('/', rutasMain);
app.use('/products', rutasProduct);
app.use('/carrito', rutasProductCart);