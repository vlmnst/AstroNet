const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token:           {type: String},
});

tokenSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;