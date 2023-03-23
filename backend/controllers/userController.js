const conn = require('../database/connection');
const util = require('util');
const bcrypt = require("bcrypt");
const crypto = require('crypto');

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
        return res.status(200).json({message: "Added new user"});
      
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }

    // check if user already exists
    // try {
    //     const stm  = `SELECT COUNT(UserName) as count FROM users WHERE UserName='${req.body.username}' LIMIT 1`;
    //     const result = await query(stm);
    //     const count = result[0].count;

    //     if (count != 0) {
    //         return res.status(401).json({message: "Username already exists"});
    //     }

    // } catch(err) {
    //     console.log(err);
    // }

    // // encrypt users password
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log(salt, hashedPassword);

    // // generate id 
    // const id = crypto.randomUUID();

    // const sqlStatement = `INSERT INTO users (UserID, Password, UserName) 
    //                         VALUES ('${id}', '${hashedPassword}', '${req.body.username}')`;

    // try {
    //     await query(sqlStatement);
    //     res.status(200).json({message: "Added new user"});
    // } catch(err) {
    //     throw err;
    // }
}

const getRowCount = async (column, toFind) => {
    const stm  = `SELECT COUNT(${column}) as count FROM users WHERE ${column}='${toFind}'`;
    const result = await query(stm);
    return !result ? 0 : result[0].count;
}

module.exports = {
    createNewUser,
 }