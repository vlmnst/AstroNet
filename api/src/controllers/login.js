const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const login = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        const user = await User.findOne({ username });
    
        const passwordCorrect = (user === null) 
            ? false
            : await bcrypt.compare(password, user.passwordHash)
        
        if (!passwordCorrect) return res.status(401).json({ status: 'FAILED', message: 'invalid username/password' });

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

        // preparo la data a devolver
        const userData = {
            username: user.username,
            email: user.email,
            role: user.role,
            token
        }

        // devuelvo el email, username, role y token
        res.send({
            status: 'SUCCESS',
            message: 'Signup successfully',
            data: userData
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


        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid'});
        };

        next();
    } catch (error) {
        return next(error);
    };
};

module.exports = { login, authOK };