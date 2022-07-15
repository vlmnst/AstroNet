const userRouter = require('express').Router();

const { createUser, getAllUsers, totalUsers, PutPrivileges, PutBanned, getPurchasedProducts, getProductsHistory, getUser } = require('../controllers/users');
// const { authOK } = require('../controllers/login');

userRouter.get('/getAll', getAllUsers);
userRouter.get('/count', totalUsers);
userRouter.post('/register', createUser);
userRouter.put('/privileges/:name', PutPrivileges);
userRouter.put('/users/banned/:name', PutBanned);
userRouter.get('/productsHistory/:name', getProductsHistory);
userRouter.get('/purchasedProducts/:name', getPurchasedProducts);
userRouter.post('/getByEmail/:email', getUser);

module.exports = userRouter;