const productsRouter = require('express').Router();

const { getAllProducts, createProduct, totalProducts, deleteProduct, buyProduct, getProductsByCategory, getProductsByName, getProductsById, getCategories} = require('../controllers/products');
// const { authOK } = require('../controllers/login');

productsRouter.get('/getAll', getAllProducts);
productsRouter.get('/count', totalProducts);
productsRouter.get('/category/:category', getProductsByCategory);
productsRouter.get('/search/:name', getProductsByName);
productsRouter.post('/create', createProduct);
productsRouter.post('/buy', buyProduct);
productsRouter.delete('/delete', deleteProduct);
productsRouter.get('/product/:id', getProductsById);
productsRouter.get('/getCategories', getCategories);

module.exports = productsRouter;