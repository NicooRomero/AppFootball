const jwt = require('jwt-simple');
const moment = require('moment');

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No está autorizado para realizar esta petición.' })
    }

    const token = req.headers.authorization.replace(/['"]+/g,"");

    try {
        var payload = jwt.decode(token, process.env.SECRET);
        if(payload.exp <= moment.unix()) {
            return res.status(404).send({ message: 'El token ha expirado.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'El token no es válido.' });
    }

    res.user = payload;
    next();
}

exports.adminAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No está autorizado para realizar esta petición.' })
    }

    const token = req.headers.authorization.replace(/['"]+/g,"");

    try {
        var payload = jwt.decode(token, process.env.SECRET);
        if(!payload.isAdmin) {
            return res.status(404).send({ message: 'Usuario no autorizado.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'El token no es válido.' });
    }

    res.user = payload;
    next();
}

exports.teamLeadAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No está autorizado para realizar esta petición.' })
    }

    const token = req.headers.authorization.replace(/['"]+/g,"");

    try {
        var payload = jwt.decode(token, process.env.SECRET);
        if(!payload.teamLeader) {
            return res.status(404).send({ message: 'Usuario no autorizado.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'El token no es válido.' });
    }

    res.user = payload;
    next();
}