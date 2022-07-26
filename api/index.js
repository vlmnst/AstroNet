require('./mongoDB');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./src/routes/index.js');
const errorHandler = require('./src/middleware/errorHandler');

const mercadopago = require('mercadopago')

// CREO EL SERVER EXPRESS Y LE PONGO UN NOMBRE
    const server = express();
    server.name = 'API';

// MIDDLEWARES
    server.use(express.json({limit: '100mb'}));
    server.use(morgan('dev'));
    server.use(cors());
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
   
// RUTEO LOS PATH Y MODULARIZO
    server.use('/', routes);
    server.use(errorHandler);

// MERCADOPAGO CONFIG
mercadopago.configure({access_token: process.env.ACCESS_TOKEN})

// CONECTO EL SERVIDOR
    const { PORT } = process.env // || 3001
    server.listen(PORT || 3001 , () => {
        console.log(`. \u2705 server-express listening at ${PORT}`);
    });