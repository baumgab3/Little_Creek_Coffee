const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post("/create-account", userController.createNewUser);
router.get("/account-details/:userId", userController.getAccountDetailsById);
router.post("/update-account/:userId", userController.updateAccountById);

module.exports = router;