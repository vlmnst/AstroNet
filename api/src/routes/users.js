const userRouter = require('express').Router();

const { createUser, getAllUsers, totalUsers, PutPrivileges, PutBanned } = require('../controllers/users');
// const { authOK } = require('../controllers/login');

userRouter.get('/getAll', getAllUsers);
userRouter.get('/count', totalUsers);
userRouter.post('/register', createUser);
userRouter.put('/privileges/:name', PutPrivileges);
userRouter.put('/users/banned/:name', PutBanned);
module.exports = userRouter;