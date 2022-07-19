const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:           { type: String, required: true, minlength: 2 },
    price:          { type: Number, required: true },
    category:       { type: Array, required: true },
    img:            { type: Array, required: true },
    stock:          { type: Number, required: true },
    soldCount:      { type: Number, required: true },
    queries:        { type: Array, required: true },        // [{userID, comment}, {}, {}]
    offer:          { type: Number, required: true },       // 0-100 %
    reviews:        { type: Array },                        // [{review: x, comment: 'string'}] ---> devolver rating desde el back
    description:    { type: Array, required: true },       // description: [{key(front): value(front)}, {}, {}]
    detail:         { type: String },                        // string
    date: Date,
});

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;