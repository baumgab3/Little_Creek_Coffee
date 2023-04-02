const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post("/", orderController.placeOrder);
router.get("/:userId", orderController.getOrdersPreview);
router.get("/view-order/:orderId", orderController.getOrderById);
// router.get("/:userId", orderController.getOrders);

module.exports = router;