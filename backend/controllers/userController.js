const conn = require('../database/connection');
const util = require('util');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { getRowCount } = require('../ServerUtil');

const query = util.promisify(conn.query).bind(conn);

const createNewUser = async (req, res) => {
    try {
        const givenLogin = req.body.givenLogin;
        const password = req.body.password;
        const isEmail = req.body.isEmail;

        // users can login with email or username, get what user is logging in with
        const columnToUse = isEmail ? "Email" : "UserName";
        // see if given login exists in database
        const givenLoginCount = await getRowCount(columnToUse, givenLogin);
        if (givenLoginCount !== 0) {
            return res.status(409).json({message: "Given username or email already exists"});
        }
        
        // if here, given login does not exist and can now add it
        // get id for user
        const userID = crypto.randomUUID();
        // encrypt password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const sqlInsert = `INSERT INTO users (UserID, ${columnToUse}, Password) VALUES ('${userID}', '${givenLogin}', '${hashedPassword}')`;
        await query(sqlInsert); 

        const user = {
            id: userID,
            user: givenLogin,
        }

        return res.status(200).json({message: "Added new user", user});
      
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }  
}


module.exports = {
    createNewUser,
 }