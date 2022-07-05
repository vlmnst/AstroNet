console.log('# # # initializing connection to server...');

require('dotenv').config();
const mongoose = require('mongoose');

// conexión con server/cluster mongodb
    const connection = process.env.MONGO_DB_URI_ADMIN;
    // const connection = process.env.MONGO_DB_URI_COLLAB;

let mongodb = mongoose.connect(connection)
    .then(() => console.log('. \u2705 mongoDB connected'))
    .catch(error => {
        console.log('. \u274C error connecting to MongoDB:', error.message);
    });

module.exports = { mongodb };