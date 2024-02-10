const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    // Get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    // Validate token
    try {
        const decodedToekn = await jwt.verify(token, SECRET);

        req.user = decodedToekn;

        next();
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('/auth/login');
    }

    next();
}