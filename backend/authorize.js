const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token == null) {
        return res.status(401).json({message: "You are not authorized!!!"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Invalid Token"});
        }

        req.user = user;
        next();
    })
}

module.exports = {authenticateToken};