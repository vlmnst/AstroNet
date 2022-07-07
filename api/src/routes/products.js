const productsRouter = require('express').Router();

const { getAllProducts, createProduct, totalProducts, deleteProduct, buyProduct, getProductsByCategory, getProductsByName } = require('../controllers/products');
// const { authOK } = require('../controllers/login');

productsRouter.get('/getAll', getAllProducts);
productsRouter.get('/count', totalProducts);
productsRouter.get('/category/:category', getProductsByCategory);
productsRouter.get('/search/:name', getProductsByName);
productsRouter.post('/create', createProduct);
productsRouter.post('/buy', buyProduct);
productsRouter.delete('/delete', deleteProduct);

module.exports = productsRouter;