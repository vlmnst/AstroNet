const bcrypt = require('bcrypt');
const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    console.log('> ...initializing connection at "getAllUsers"');

    try {
        const users = await User.find({})
            .find({}).populate('productsHistory', { user: 0 }); // que me traiga todo de 'products' menos el user
        return res.json(users);
    } catch (error) {
        return next(error);
    };
};

const totalUsers = async (req, res, next) => {
    console.log('> ...initializing connection at "totalUsers"');

    try {
        let result = await User.count();
        return res.json({result});
    } catch (error) {
        return next(error);
    };
};

const createUser = async (req, res, next) => {
    console.log('> ...initializing connection at "createUser"');

    try {
        const { 
            username,
            password,
            email,
            role,
            dni,
            firstname,
            lastname,
            birthday,
            phone,
            location,
            address, 
        } = req.body;

        if (!username || !password) return res.status(400).json({ error: 'empty fields'});

        // hash passwd
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            email,
            role,
            dni,
            firstname,
            lastname,
            birthday,
            phone,
            location,
            address,
            passwordHash,
            productsHistory: [],
            favorites: [],
            queries: [],
        });

        if (user) {
            let userSaved = await user.save();
            userSaved ? res.json(userSaved) : res.status(400).json({ error: 'error while saving user'});
        } else {
            res.status(400).json({ error: 'error while creating user'});
        } 
    } catch (error) {
        return next(error);
    };
};

module.exports = { createUser, getAllUsers, totalUsers };