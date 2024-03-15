const jwt = require('jsonwebtoken');
const errorHandler = require('./err.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });
};

module.exports = {
    verifyToken
};
