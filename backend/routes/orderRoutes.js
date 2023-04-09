const express = require('express');
const orderController = require('../controllers/orderController');
const {authenticateToken} = require('../authorize.js');

const router = express.Router();

router.post("/", orderController.placeOrder);
router.get("/:userId", authenticateToken, orderController.getOrdersPreview);
// router.get("/view-order/:orderId", authenticateToken, orderController.getOrderById);
router.get("/view-order/:orderId/:userId", authenticateToken, orderController.getOrderById);
// router.get("/:userId", orderController.getOrders);

module.exports = router;