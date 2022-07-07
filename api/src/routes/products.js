const productsRouter = require('express').Router();

const { getAllProducts, createProduct, totalProducts, deleteProduct, buyProduct, getProductsByCategory } = require('../controllers/products');
// const { authOK } = require('../controllers/login');

productsRouter.get('/getAll', getAllProducts);
productsRouter.get('/count', totalProducts);
productsRouter.get('/category/:category', getProductsByCategory);
productsRouter.post('/create', createProduct);
productsRouter.post('/buy', buyProduct);
productsRouter.delete('/delete', deleteProduct);

module.exports = productsRouter;