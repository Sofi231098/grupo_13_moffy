const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const UserLoggedMiddleware = require('./middlewares/UserLoggedMiddleware.js');

const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const rutasMain = require('./routes/main.js');
const rutasUser = require('./routes/user.js');
const rutasProduct = require('./routes/product.js');
const rutasProductCart = require('./routes/productCart.js');


// ************ Middlewares - (don't touch) ************
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(cookieParser());
app.use(session({secret: 'Secret', resave: false, saveUninitialized: false}));
app.use(UserLoggedMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});

app.use('/', rutasMain);
app.use('/', rutasUser);
app.use('/products', rutasProduct);
app.use('/carrito', rutasProductCart);

app.use((req, res, next) => {
    res.status(404).render('not-found');
    next();
})