const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //comes in as 'Bearer token'

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