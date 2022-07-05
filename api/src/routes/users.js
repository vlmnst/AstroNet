const userRouter = require('express').Router();

const { createUser, getAllUsers, totalUsers } = require('../controllers/users');

userRouter.get('/getAll', getAllUsers);
userRouter.get('/count', totalUsers);
userRouter.post('/register', createUser);


module.exports = userRouter;