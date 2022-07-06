const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username:           { type: String, required: true, unique: true },
    email:              { type: String, required: true, unique: true },
    role:               { type: String, required: true },       // role (admin/user/banned)
    passwordHash:       { type: String, required: true },
    dni:                { type: Number, required: true },
    firstname:          { type: String, required: true },
    lastname:           { type: String, required: true },
    birthday:           { type: String, required: true },
    phone:              { type: String, required: true },
    location:           { type: Object, required: true },       // country {country: , city: , state: }
    address:            { type: Object, required: true },       // address {street address: , floor: , department: , zip code: }
    productsHistory:    { type: Object },
    favorites:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    queries:            [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

// validar atributos 'unique'
    userSchema.plugin(uniqueValidator);

// eliminar _id y __v al devolverlos de la database
    userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject.passwordHash;  // no revelar passwordHash
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;