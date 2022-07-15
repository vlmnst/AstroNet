const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

        // chequeo no repetir username/email
        const users = await User.find({username})
        if (users.length > 0) return res.status(400).json({ error: 'username already exists'})
        const emails = await User.find({email})
        if (emails.length > 0) return res.status(400).json({ error: 'email already exists'})

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
    let {username, privilege}= req.body.privileges;

    try{
        let isAdmin = await User.find({username})
        if(isAdmin.role==="admin"){
            await User.findOneAndUpdate({username:name},{$set:{"role":privilege}})
            res.status(200).send("Privileges Updated")
        }else{
            res.status(400).json({ error: 'not admin'});
        }
    } catch(e){
        res.status(404).send(e.message)
    }
};

const PutBanned = async (req, res, next) => {
    let name=req.params.name
    let {username, privilege}= req.body.banned;
    try{
        let isAdmin = await User.find({username})
        if(isAdmin.role==="admin"){
            await User.findOneAndUpdate({username:name},{$set:{"role":privilege}})
            res.status(200).send(`. \u2705 user "${name}" "banned" status Updated to ${privilege}`)
        }else{
            res.status(400).json({ error: 'not admin'});
        }
    } catch(e){
        res.status(404).send(e.message)
    }
};

const getProductsHistory = async (req, res, next) => {
    let name=req.params.name
 
    try {
        const prodHistory = await User.findOne({username: name}, {"productsHistory": 1})
        return res.json(prodHistory);
    } catch (error) {
        return next(error);
    };      
 }

const getPurchasedProducts = async (req, res, next) => {
    console.log('> ...initializing connection at "getPurchasedProducts"');
    
    try {
        const { name: username } = req.params;

        // not user?
        if (!username) res.status(400).json({ error: 'The username was not found in the database'})

        const {productsHistory} = await User.findOne({username}, {"productsHistory": 1, "_id": 0})

        if (productsHistory.length > 0) {
            let purchasedProducts = [];
            productsHistory.map(p => p.detail.map(prod => purchasedProducts.push(prod)));
            res.json(purchasedProducts);
        } else {
            res.status(400).json({ error: 'Your products history is empty, buy something'})
        }; 
    } catch (error) { 
        return next(error);
    };
};

const getUser = async (req, res, next) => {
    const { email } = req.params;
    try {
      let user = await User.find({ email: email });
      if (user.length === 0) {
        return res.json({ message: "Not register user" });
      }
      if (user) {
        const { _id, username, email, role } = user[0]
        const dataToken = {
          id: _id,
          username: username,
          email: email,
        };
        const token = jwt.sign(dataToken, process.env.SECRET, {
          expiresIn: 60 * 60 * 1 * 1, // expira cada 7 días (segs, mins, horas, dias)
        });
         
        const userData = {
          username: username,
          email: email,
          role: role,
          token,
        };
        return res.send({
          status: "SUCCESS",
          message: "Signup successfully",
          data: userData,
        });
      }
    } catch (e) {
      res.status(404).send(e.message);
    }
  };

module.exports = { createUser, getAllUsers, totalUsers, PutPrivileges, PutBanned, getPurchasedProducts, getProductsHistory, getUser };