const bcrypt = require('bcrypt');
const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    console.log('> ...initializing connection at "getAllUsers"');

    try {
        const users = await User.find({})
            // .find({}).populate('productsHistory', { user: 0 }); // que me traiga todo de 'products' menos el user
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
            dni,
            firstname,
            lastname,
            birthday,
            phone,
            location,
            address, 
        } = req.body;

        // hash passwd
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            email,
            role: 'user',
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

        let userSaved = await user.save();
        
        if (userSaved) {
            console.log(`. \u2705 user "${username}" registered and saved OK`);
            return res.json(userSaved);
        } else {
            res.status(400).json({ error: 'error while saving user'});
        };
    } catch (error) {
        return next(error);
    };
};
const PutPrivileges = async (req, res, next) => {
    let name=req.params.name
    let {privileges}= req.body;
    try{
            await User.findOneAndUpdate({username:name},{$set:{"role":privileges}})
            res.status(200).send("Privileges Updated")
    } catch(e){
        res.status(404).send(e.message)
    }
};
const PutBanned = async (req, res, next) => {
    let name=req.params.name
    let {banned}= req.body;
    try{
            await User.findOneAndUpdate({username:name},{$set:{"banned":banned}})
            res.status(200).send(`. \u2705 user "${name}" "banned" status Updated to ${banned}`)
    } catch(e){
        res.status(404).send(e.message)
    }
};

module.exports = { createUser, getAllUsers, totalUsers, PutPrivileges, PutBanned };