const express = require('express');
const session = require('../controllers/sessionController');

const router = express.Router();

router.post("/my-account", session.login);
router.post("/logout", session.logout);


module.exports = router;