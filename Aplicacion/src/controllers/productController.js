const path = require('path');
const fs = require('fs');
const products = require('../data/productsDataBase.json');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const productController = {
    product: (req, res) => {
        let { name, category, precioMax, ordenar } = req.query;
        name = name ? name.toLowerCase() : null;
        category = category ? category.toLowerCase() : null;

        let productsFiltered = products.filter(product => {
            if (name && !product.name.toLowerCase().includes(name)) {
                return false;
            }
            if (category && !product.category.toLowerCase().includes(category)) {
                return false;
            }
            if (precioMax && product.price > precioMax) {
                return false;
            }
            return true;
        });
        if (ordenar && ordenar !== 'Nuevos ingresos') {
            productsFiltered.sort((a, b) => {
                if (ordenar === 'Menor precio') {
                    return a.price - b.price;
                }
                if (ordenar === 'Mayor precio') {
                    return b.price - a.price;
                }
            });
        } else {
            if (ordenar === 'Nuevos ingresos') {
                productsFiltered = productsFiltered.reverse();
            }
        }
        return res.render('products/products', { products: productsFiltered });
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
        typeof (req.body.talles) === 'string' ? newProduct.talles = [req.body.talles] : newProduct.talles = req.body.talles;
        typeof (req.body.colors) === 'string' ? newProduct.colors = [req.body.colors] : newProduct.colors = req.body.colors;
        newProduct.price = Number(newProduct.price);
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.send(newProduct);
    },
    productEdit: (req, res) => {
        const { id } = req.params;
        const product = products.find(product => product.id == id);
        return res.render('products/productEdit', { product });
    },
    productUpdate: (req, res) => {
        const { id } = req.params;
        const producto = (req.file) ? { ...req.body, image: req.file.filename } : { ...req.body };
        typeof (req.body.talles) === 'string' ? producto.talles = [req.body.talles] : producto.talles = req.body.talles;
        typeof (req.body.colors) === 'string' ? producto.colors = [req.body.colors] : producto.colors = req.body.colors;
        producto.price = Number(producto.price);
        const indexProduct = products.findIndex(product => product.id == id);
        products[indexProduct] = {
            ...products[indexProduct],
            ...producto
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return res.redirect('/products');
    },
    productDetail: (req, res) => {
        const { id } = req.params;
        const productDetail = products.find(product => product.id == id);
        return res.render('products/productDetail', { producto: productDetail });
    },
    productDelete: (req, res) => {
        const { id } = req.params;
        const indexProduct = products.findIndex(product => product.id == id);
        products.splice(indexProduct, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return res.redirect('/products');
    }
};

module.exports = productController;