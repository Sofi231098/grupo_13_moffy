const productController = {
    product: (req, res) => {
        return res.render('products/products');
    },
    productRegister: (req, res) => {
        return res.render('products/productRegister.ejs');
    },
    productEdit: (req, res) => {
        return res.render('products/productEdit.ejs');
    }
};

module.exports = productController;