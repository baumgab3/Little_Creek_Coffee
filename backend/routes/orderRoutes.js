const express = require('express');
const orderController = require('../controllers/orderController');
const {authenticateToken} = require('../authorize.js');

const router = express.Router();

// endpoint: /orders

router.post("/", authenticateToken, orderController.placeOrder); 
router.get("/:userId", authenticateToken, orderController.getOrdersPreview);
router.get("/view-order/:orderId/:userId", authenticateToken, orderController.getOrderById);

module.exports = router;