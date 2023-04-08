const express = require('express');
const userController = require('../controllers/userController');
const {authenticateToken} = require('../authorize.js');

const router = express.Router();

router.post("/create-account", userController.createNewUser);
router.get("/account-details/:userId", authenticateToken, userController.getAccountDetailsById);
router.post("/update-account/:userId", authenticateToken, userController.updateAccountById);

module.exports = router;