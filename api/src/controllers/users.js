const bcrypt = require('bcrypt');
const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('./nodemailer');

const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find({})
            // .find({}).populate('productsHistory', { user: 0 }); // que me traiga todo de 'products' menos el user
        return res.json(users);
    } catch (error) {
        return next(error);
    };
};

const totalUsers = async (req, res, next) => {

    try {
        let result = await User.count();
        return res.json({result});
    } catch (error) {
        return next(error);
    };
};

const createUser = async (req, res, next) => {

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
    let {username, privilege}= req.body;
    try{
        let isAdmin = await User.find({username})
        if(isAdmin[0].role==="admin"){
            await User.findOneAndUpdate({"username":name},{$set:{"role":privilege}})
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
    let {username, privilege}= req.body;
    try{
        let isAdmin = await User.find({username})
        if(isAdmin[0].role==="admin"){
            await User.findOneAndUpdate({"username":name},{$set:{"role":privilege}})
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
    
    try {
        const { name: username } = req.params;

        // not user?
        if (!username) res.status(400).json({ error: 'The username was not found in the database'})

        const {productsHistory} = await User.findOne({username}, {"productsHistory": 1, "_id": 0})

        if (productsHistory.length > 0) {
            let purchasedProducts = [];
            let repeats = [];
            
            productsHistory.map(p => p.detail.map(prod => {
                if (!repeats.includes(prod.id)) {
                    repeats.push(prod.id)
                    purchasedProducts.push(prod)
                }
            }))

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

  const getUsersFull = async (req, res, next) => {
    const { email } = req.params;
    try {
      let user = await User.find({ email: email });
      if (user.length === 0) {
        return res.json({ message: "Not register user" });
      }
      return res.json(user)
    } catch (e) {
      res.status(404).send(e.message);
    }
  };
  const getPurchasedProductsAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        if (users.length > 0) {
            let purchasedProducts = [];
            users.map(p => p.productsHistory.map(prod => purchasedProducts.push({username: p.username, email: p.email, prod})));
            // console.log(purchasedProducts)
            res.json(purchasedProducts);
        } else {
            res.status(400).json({ error: 'Your products history is empty, buy something'})
        }; 
    } catch (error) { 
        return next(error);
    };
};
const putpurchasedProducts = async (req, res, next) => {
    let order=req.params.order
    let {username, status}= req.body;
    try{
        let isAdmin = await User.find({username})
        if(isAdmin[0].role==="admin"){
            let users = await User.find()
            let productsHistory = [];
            let Name=[]
            users.map(p =>  p.productsHistory?(p.productsHistory.map(prod => prod.order===order?Name.push(p.username):null)):null);
            let user = await User.find({"username":Name[0]})
            user[0].productsHistory.map(p => productsHistory.push(p));
            for (let i = 0; i < productsHistory.length; i++) {  
                if(productsHistory[i].order===order){
                    productsHistory[i].status=status
                }
            }
            await User.findOneAndUpdate({"username":Name[0]},{$set:{"productsHistory":productsHistory}})
            res.status(200).send(`. \u2705 order "${order}" "status" Updated to ${status}`)
        }else{
            res.status(400).json({ error: 'not admin'});
        }
    } catch(e){
        res.status(404).send(e.message)
    }
};
const putUser = async (req, res, next) => {
    let {username}=req.params
    let {
        email,
		dni,
		firstname,
		lastname,
		birthday,
		phone,
		location,
		address
    }= req.body;
    try{
            await User.findOneAndUpdate({"username":username},{$set:{
                "email":email,
		        "dni":dni,
		        "firstname":firstname,
		        "lastname":lastname,
		        "birthday":birthday,
		        "phone":phone,
		        "location":location,
		        "address":address
            }})
            res.status(200).send(`. \u2705 user "${username}" Updated `)
    } catch(e){
        res.status(404).send(e.message)
    }
};
const resetUserPassword = async(req, res, next) => {
    try {
        const { id, userMail } = req.body;
        const user = await User.findById(id);

        if (!user) return res.status(401).json( { error: 'user invalid'});

        const newPassword = uuidv4();

        // hash passwd
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(newPassword, saltRounds);

        user.passwordHash = passwordHash;
        user.save();

        const message = `For security policies we reset your Astronet password. You can change to the password you want in the modify user section of our app. Greetings from Astronet! The new password is " ${newPassword} "`;
        const payload = { body: { userMail, message }};

        await sendEmail(payload);

        return res.json( { msg: 'new password created successfully'})
    } catch (error) {
        return next(error);
    }
};

const addItemInWishList = async (req, res, next) => {
    try{
       const{itemId, user}= req.body;
       const item = await Product.findById(itemId);
       const userName = await User.find({'username': user})
       if(userName){
        await User.findOneAndUpdate({'username': user},{$set:{'favorites':item}})
            res.status(200).send(`added to ${user} wishlist`)
       }else {
        res.status(400).json({ error: 'not added in wishlist'});
       }
    }catch (error) {
        return next(error);
    };

};

const wishListComming = async (req, res, next) => {
        const{user}= req.params; 

        let mapeo = [];
    try {
        const wishListUser = await User.findOne({'username': user})
        let userWishList = [];
             if(wishListUser){
                 mapeo = wishListUser.favorites.map( async (f) => {
                    let product = await Product.findById(f)
                    userWishList.push(product);
                })
             } 
             await Promise.all(mapeo)   
            //  console.log(userWishList);
             return res.json(userWishList);
                          
    }catch (error) {
        console.log(error)
    }
}


module.exports = { createUser, getAllUsers, totalUsers, PutPrivileges, PutBanned, getPurchasedProducts, getProductsHistory, getUser,getUsersFull,getPurchasedProductsAllUsers,putpurchasedProducts, resetUserPassword,putUser, addItemInWishList, wishListComming};

