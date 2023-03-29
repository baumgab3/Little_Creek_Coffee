const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post("/", orderController.placeOrder);
router.get("/:userId", orderController.getPastOrdersPreview);

module.exports = router;