const conn = require('../database/connection');
const util = require('util');
const bcrypt = require("bcrypt");
const { getRowCount } = require('../ServerUtil');

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

    const hashedPassword = await query(sqlUserInfo).then(result => {
        return result[0].Password;
    });

    // verify hashedPassword in database to password used for login
    if (!await bcrypt.compare(password, hashedPassword )) {
        return res.status(401).json({message: "Failed login!"});
    }

    // if here password and username was valid, return ok
    return res.status(200).json({message: "Login was valid"});
}

const logout = async (req, res) => {
    return res.status(200).json({message: "Logout was valid"});
}


module.exports = {
    login,
    logout
}