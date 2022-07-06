const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // reviso si ya estoy logueado
        const authorization = req.get('authorization');     // recupera la cabecera http 'authorization' (es de express)
            if (authorization && authorization.toLowerCase().startsWith('bearer')) 
                return res.status(400).json({ error: 'you are already logged in'});

        const user = await User.findOne({ username });
    
        const passwordCorrect = (user === null) 
            ? false
            : await bcrypt.compare(password, user.passwordHash)
        
        if (!passwordCorrect) return res.status(401).json({ error: 'invalid username/password'});

        // si logueo bien, agrego la data que va a ir en el token codificado
        const dataToken = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // creo el token modificado con la dataToken y lo encripto con la palabra secreta
        const token = jwt.sign(dataToken, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7     // expira cada 7 días (segs, mins, horas, dias)
        });

        // devuelvo el email, username, role y token
        res.send({
            email: user.email,
            username: user.username,
            role: user.role,
            token
        })
    } catch (error) {
        return next(error);
    };

};

// agregar esta funcion a rutas donde solo quiero que ingresen solo usuarios logueados
const authOK = async (req, res, next) => {

    try {
        const authorization = req.get('authorization');     // recupera la cabecera http 'authorization' (es de express)

        let token = null;

        // la cabecera sería algo asi: 'Bearer kjgalksdkglahsdalk'
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
        };

        let decodedToken = {};
        try {
            decodedToken = jwt.verify(token, process.env.SECRET);
        } catch {};

        console.log(decodedToken);
        // console.log(token);


        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid'});
        };

        next();
    } catch (error) {
        return next(error);
    };
};

module.exports = { login, authOK };