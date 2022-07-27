const userRouter = require('express').Router();
const { createUser, getAllUsers, totalUsers, PutPrivileges, PutBanned, getPurchasedProducts, getProductsHistory, getUser,getUsersFull,getPurchasedProductsAllUsers,putpurchasedProducts,resetUserPassword,putUser } = require('../controllers/users');
const { sendEmail,pushToken,putToken} = require('../controllers/nodemailer');//import email
// const { authOK } = require('../controllers/login');

userRouter.get('/getAll', getAllUsers);
userRouter.get('/count', totalUsers);
userRouter.post('/register', createUser);
userRouter.put('/privileges/:name', PutPrivileges);
userRouter.put('/banned/:name', PutBanned);
userRouter.get('/productsHistory/:name', getProductsHistory);
userRouter.get('/purchasedProducts/:name', getPurchasedProducts);
userRouter.post('/getByEmail/:email', getUser);
userRouter.get('/getUserFull/:email', getUsersFull);
userRouter.post('/email',sendEmail);//ruta email
userRouter.post('/pushToken',pushToken);//ruta push
userRouter.post('/putToken',putToken);//ruta push
userRouter.get('/getpurchasedProductsAllUsers', getPurchasedProductsAllUsers);
userRouter.put('/putpurchasedProducts/:order', putpurchasedProducts);
userRouter.put('/resetPassword', resetUserPassword);
userRouter.put('/update/:username', putUser);

module.exports = userRouter;