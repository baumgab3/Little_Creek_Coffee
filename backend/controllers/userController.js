const conn = require('../database/connection');
const util = require('util');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { getRowCount } = require('../ServerUtil');
const jwt = require('jsonwebtoken');

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

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        user.accessToken = accessToken;

        return res.status(200).json({message: "Added new user", user});
      
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }  
}

const getAccountDetailsById = async (req, res) => {

    try {

        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const userId = req.params.userId;
        const sqlSelect = `SELECT * FROM users WHERE UserID='${userId}'`;
        const queryResult = await query(sqlSelect);
        
        if (!queryResult || queryResult.length === 0) {
            return res.status(404).json({message: "No account found"});
        }

        const result = queryResult[0];

 
        const accountDetails = {
            firstName: result.FirstName,
            lastName: result.LastName,
            displayName: result.DisplayName,
            email: result.Email,
        }

        return res.send(accountDetails);

    } catch (err) {
        console.log("getAccountDetailsById error", err);
        return res.status(500).json({message: "Server error"});
    }

}

const updateAccountById = async (req, res) => {
    try {

        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const userId = req.body.user.id;
        const accountUpdate = req.body.accountDetailsUpdate;
        let hashedPassword;
        
        // first we need to check if updating password
        if (accountUpdate.newPassword && accountUpdate.newPasswordConfirm) {
            
            // TODO - can add more validation later, but do the easy one for now
            if (accountUpdate.newPassword !== accountUpdate.newPasswordConfirm) {
                return res.status(403).json({message: "Passwords do not match"});
            }

            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(accountUpdate.newPassword, salt);
        }

        // verify that user is not updating with an existing email
        const sqlEmailSelect = `SELECT COUNT(*) as count FROM users WHERE Email = '${accountUpdate.email}' AND UserID != '${userId}' LIMIT 1`;
        const emailCount = await query(sqlEmailSelect).then((resultCount) => resultCount[0].count);

        if (emailCount !== 0) {
            return res.status(403).json({message: "Given email already exists"});
        }


        // everything good here, can make update
        let sqlUpdate = `UPDATE users SET FirstName='${accountUpdate.firstName}', LastName='${accountUpdate.lastName}', DisplayName='${accountUpdate.displayName}',
                            Email='${accountUpdate.email}'`;

        if (hashedPassword) {
            sqlUpdate = sqlUpdate + `, Password='${hashedPassword}'`;
        }

        // add WHERE
        sqlUpdate = sqlUpdate + `WHERE UserID='${userId}'`;
        
        await query(sqlUpdate);
  
        return res.status(200).json({message: "Account updated"});

    } catch (err) {
        console.log("updateAccountById error", err);
        return res.status(500).json({message: "Server error"});
    }
}


module.exports = {
    createNewUser,
    getAccountDetailsById,
    updateAccountById
 }