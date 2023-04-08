const express = require('express');
const addressController = require('../controllers/addressController');
const {authenticateToken} = require('../authorize.js');

const router = express.Router();

router.get("/billing/:userId", authenticateToken, addressController.getBillingAddressById);
router.get("/shipping/:userId", authenticateToken, addressController.getShippingAddressById);
router.post("/billing/:userId", authenticateToken, addressController.saveBillingAddress);
router.post("/shipping/:userId", authenticateToken, addressController.saveShippingAddress);
router.delete("/billing/:userId", authenticateToken, addressController.deleteBillingAddress);
router.delete("/shipping/:userId", authenticateToken, addressController.deleteShippingAddress);
router.get("/:userId", authenticateToken, addressController.getBillingAndShippingInfo);

module.exports = router;