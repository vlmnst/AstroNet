const Product = require('../models/Product');
const User = require('../models/User');

const getAllProducts = async (req, res, next) => {
    console.log('> ...initializing connection at "getAllProducts"');

    try {
        const products = await Product.find({})
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
            description,
        } = req.body;
      
        const product = new Product({
            name,
            price,
            category,
            img,
            stock,
            soldCount: 0,
            offer: offer ? offer : 0,
            description,
            reviews: [],
            queries: [],
            date: new Date(),
        });
      
        const savedProduct = await product.save();
        console.log(`. \u2705 product "${name}" created and saved OK`);
        return res.json(savedProduct);
    } catch (error) {
        return next(error);
    };
};

const editProduct = async (req, res, next) => {

    try {
        const { 
            name,
            price,
            category,
            img,
            stock,
            offer,
            description,
        } = req.body;

        const productId = req.params.id

        const edProduct = Product.finOneAndUpdate({id: productId}, {
            name,
            price,
            category,
            img,
            stock,
            offer,
            description,
            }    
        );

        console.log(`. \u2705 product "${name}" edited OK`);
        return res.json(edProduct);
    } catch (error) {
        return next(error);
    };
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productID } = req.body;

        if (!productID) return res.status(400).json({error: 'enter product id'});
       
        let product = await Product.findById(productID);
        await Product.deleteOne({ name: product.name});
        return res.json(product);
    } catch (error) {
        return next(error);
    };
};

const buyProduct = async (req, res, next) => {
    console.log('> ...initializing connection at "buyProduct"');

    try {
        // cart = [{idProduct1, quantity}, {idProduct2, quantity}, etc]
        const { cart, userID } = req.body;
        const user = await User.findById(userID);

        // ! ! ! ! ! vaciar historial de compras del usuario ! ! ! ! !
            // await User.updateOne({"username": "usermauro"}, {$set: {"productsHistory": []}});
            // return res.json(user);

        var outOfStock = 0;
        let promisesStock = cart.map(async(prods) => {
            let productStock = await Product.findById(prods.id);

            if (productStock.stock < prods.quantity) {
                outOfStock++;
            };
        });

        await Promise.all(promisesStock);

        if (outOfStock > 0) return res.status(400).json({ error: `out of stock` });

        let cartProducts = [];
        let totalPrice = 0;

        // mapeo los productos del carrito
        let emptyCart = cart.map(async(prods) => {
            let product = await Product.findById(prods.id);

            let { price, name, offer } = product;

            product.stock = product.stock - prods.quantity;
            product.soldCount = product.soldCount + prods.quantity;
            totalPrice = totalPrice + price;
            product.save();

            // agrego uno por uno, cada producto del carrito al 'cartProducts'
            cartProducts.push({
                id: prods.id,
                name,
                price,
                offer,
                quantity: prods.quantity,
            });
        });
        
        await Promise.all(emptyCart);

        // creo la orden de compra
        const order = {
            order: "number-of-order",
            date: new Date(),
            total: totalPrice,
            detail: cartProducts,
        };

        user.productsHistory = user.productsHistory.concat(order);
        user.save();
        
        return res.json(order);  
    } catch (error) {
        return next(error);
    };

};

const getProductsByCategory = async (req, res, next) => {
    try{
        let category = req.params.category
        console.log(category)
        if(category){
            let productsFound = await Product.find({category: category})
            if(productsFound.length === 0) {
                 return res.json('We are sorry, There are no products with the category ' + category)
            }
            if(productsFound.length !== 0)
                return res.json(productsFound);     
        }
        else{
            return res.json('The category was not indicated')    
        }
    }
    catch(error){
        return next(error);
    }
};

const getProductsByName = async (req, res, next) => {
    try {
        let name = req.params.name.toLowerCase()
        let products = await Product.find({})
        let productsIncludesName = products.filter(item => 
            item.name.toLowerCase().includes(name) ||
            item.category.toLowerCase().includes(name) ||
            item.description.Brand.toLowerCase().includes(name)
        )
        if(productsIncludesName.length === 0) return res.json({ error:  'We are sorry, we do not have that product, try something else'})
        if(productsIncludesName.length !== 0) return res.json(productsIncludesName);    
    } catch (error) {
        return next(error);
    }
}
const getProductsById = async (req, res, next) => {
    try {
        let id = req.params.id
        if(id){
            let products = await Product.findById(id);
            res.status(200).json(products) 
        }else{
            res.json({ error: 'please enter an id'})
        }   
    } catch (error) {
        return next(error.detail);
    }
}
const getCategories = async (req, res, next) => {
    try {
        let products = await Product.find({})
        var array= products.map(O => O.category).flat()
        const sin_repetidos= [... new Set(array)]
        res.status(200).json(sin_repetidos);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { getAllProducts, createProduct, totalProducts, deleteProduct, buyProduct, getProductsByCategory, getProductsByName, getProductsById, getCategories, editProduct };