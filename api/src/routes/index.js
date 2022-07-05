const router = require('express').Router();

const notFound = require('../middleware/notFoundHandler');
const users = require('./users.js');
const products = require('./products');

router.use('/products', products);
router.use('/users', users);
router.use('*', notFound);


module.exports = router;