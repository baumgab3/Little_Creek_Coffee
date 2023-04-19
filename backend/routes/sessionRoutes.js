const express = require('express');
const session = require('../controllers/sessionController');
const { authenticateToken } = require('../authorize');

const router = express.Router();

router.post("/my-account", session.login);
router.post("/logout", session.logout);
router.get("/check-authorization/:userId", authenticateToken, session.authorize);


module.exports = router;