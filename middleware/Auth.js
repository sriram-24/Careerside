const jwt = require('jsonwebtoken');
const config = require("config");
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'no token, Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.User;


        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}