const Product = require('../models/Product');
const User = require('../models/User');

const getAllProducts = async (req, res, next) => {
    console.log('> ...initializing connection at "getAllProducts"');

    try {
        const products = await Product.find({})
            .find({}).populate('user', { username: 1 })
        return res.json(products);      
    } catch (error) {
        return next(error);
    };
};

const totalProducts = async (req, res, next) => {
    console.log('> ...initializing connection at "totalProducts"');

    try {
        let result = await Product.count();
        return res.json({result});
    } catch (error) {
        return next(error);
    };
};

const createProduct = async (req, res, next) => {
    console.log('> ...initializing connection at "createProduct"');

    try {
        const { 
            name,
            price,
            category,
            img,
            stock,
            offer,
            description: {},
        } = req.body;

        if (!name || !price) return res.status(400).json({ error: 'empty fields'});

        // const user = await User.findById(userID);
        // if (!user) return res.status(400).json({ error: 'user not in database'});
      
        const product = new Product({
            name,
            price,
            category,
            img,
            stock,
            soldCount: 0,
            offer: offer ? offer : 0,
            description: {},
            reviews: [],
            queries: [],
            date: new Date(),
            // user: user._id
        });
      
        const savedProduct = await product.save();
        // user.products = user.products.concat(savedProduct._id);
        // await user.save();
        console.log(`. \u2705 product "${name}" created and saved OK`);
        return res.json(savedProduct);
    } catch (error) {
        return next(error);
    };
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productID, userID } = req.body;

        if (!productID || !userID) return res.status(400).json({error: 'enter product id and user id'});
       
        let product = await Product.findById(productID);
        await Product.deleteOne({ name: product.name});
        let user = await User.findById(userID);
        user.products = user.products.filter(prod => prod.toString() !== product._id.toString());
        await user.save();
        return res.json(user);
    } catch (error) {
        return next(error);
    };
};

module.exports = { getAllProducts, createProduct, totalProducts, deleteProduct };