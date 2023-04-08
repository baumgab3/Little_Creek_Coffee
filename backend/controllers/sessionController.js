const conn = require('../database/connection');
const util = require('util');
const bcrypt = require("bcrypt");
const { getRowCount } = require('../ServerUtil');
const jwt = require('jsonwebtoken');

const query = util.promisify(conn.query).bind(conn);

const login = async (req, res) => {
    const givenLogin = req.body.givenLogin;
    const password = req.body.password;
    const isEmail = req.body.isEmail;

    // users can login with email or username, get what user is logging in with
    const columnToUse = isEmail ? "Email" : "UserName";

    // verify account exists
    const givenLoginCount = await getRowCount(columnToUse, givenLogin);
    if (givenLoginCount === 0) {
        return res.status(404).json({message: "Given username or email does not exist"});
    }

    // if here then account exists
    // get user info from table
    const sqlUserInfo = `SELECT * FROM users WHERE ${columnToUse}='${givenLogin}'`;

    const result = await query(sqlUserInfo);
    const hashedPassword = result[0].Password;

    // verify hashedPassword in database to password used for login
    if (!await bcrypt.compare(password, hashedPassword )) {
        return res.status(401).json({message: "Failed login!"});
    }

    const user = {
        id: result[0].UserID,
        user: result[0].UserName,
    }

    // check if user has a preferred display name
    const displayName = result[0].DisplayName;

    if (displayName) {
        user.displayName = displayName;
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    user.accessToken = accessToken;

    // if here password and username was valid, return ok
    return res.status(200).json({message: "Login was valid", user});
}

const logout = async (req, res) => {
    // TODO - need to do anything with token?
    return res.status(200).json({message: "Logout was valid"});
}


module.exports = {
    login,
    logout
}