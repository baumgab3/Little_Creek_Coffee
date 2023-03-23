const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post("/create-account", userController.createNewUser);

module.exports = router;