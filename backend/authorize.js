const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //comes in as 'Bearer token'

    console.log("1");

    if (token == null) {
        console.log("2");
        return res.status(401).json({message: "You are not authorized!!!"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("3");
            return res.status(403).json({message: "Invalid Token"});
        }

        console.log("4");
        req.user = user;
        next();
    })
}

module.exports = {authenticateToken};