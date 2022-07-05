const productsRouter = require('express').Router();

const { getAllProducts, createProduct, totalProducts, deleteProduct, buyProduct } = require('../controllers/products');

productsRouter.get('/getAll', getAllProducts);
productsRouter.get('/count', totalProducts);
productsRouter.post('/create', createProduct);
productsRouter.post('/buy', buyProduct);
productsRouter.delete('/delete', deleteProduct);

module.exports = productsRouter;