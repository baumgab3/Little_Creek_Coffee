const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

router.get("/billing/:userId", addressController.getBillingAddressById);
router.get("/shipping/:userId", addressController.getShippingAddressById);
router.post("/billing/:userId", addressController.saveBillingAddress);
router.post("/shipping/:userId", addressController.saveShippingAddress);
router.delete("/billing/:userId", addressController.deleteBillingAddress);
router.delete("/shipping/:userId", addressController.deleteShippingAddress);
router.get("/:userId", addressController.getBillingAndShippingInfo);

module.exports = router;