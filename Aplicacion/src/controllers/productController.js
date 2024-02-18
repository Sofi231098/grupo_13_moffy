const path = require('path');
const fs = require('fs');
const products = require('../data/productsDataBase.json');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const productController = {
    product: (req, res) => {
        return res.render('products/products', { products });
    },
    productRegister: (req, res) => {
        return res.render('products/productRegister');
    },
    productStore: (req, res) => {
		const image = req.file.filename;
        const newProduct = {
            ...req.body,
            id: crypto.randomUUID(),
            image
        }
        typeof(req.body.talles) === 'string' ? newProduct.talles = [req.body.talles] : newProduct.talles = req.body.talles;
        typeof(req.body.colors) === 'string' ? newProduct.colors = [req.body.colors] : newProduct.colors = req.body.colors;
        products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.send(newProduct);
    },
    productEdit: (req, res) => {
        const {id} = req.params;
        const product = products.find(product => product.id == id);
        return res.render('products/productEdit', { product });
    },
    productUpdate: (req, res) => {
        const {id} = req.params;
        const producto = (req.file) ? { ...req.body, image: req.file.filename } : { ...req.body };
        typeof(req.body.talles) === 'string' ? producto.talles = [req.body.talles] : producto.talles = req.body.talles;
        typeof(req.body.colors) === 'string' ? producto.colors = [req.body.colors] : producto.colors = req.body.colors;
        const indexProduct = products.findIndex(product => product.id == id);
        products[indexProduct] = {
            ...products[indexProduct],
            ...producto
        };
        console.log(products[indexProduct]);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return res.redirect('/products');
    },
    productDetail: (req, res) => {
        const {id} = req.params;
        const productDetail = products.find(product => product.id == id);
        return res.render('products/productDetail', { producto: productDetail });
    },
    productDelete: (req, res) => {
        const {id} = req.params;
        const indexProduct = products.findIndex(product => product.id == id);
        products.splice(indexProduct, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return res.redirect('/products');
    }
};

module.exports = productController;