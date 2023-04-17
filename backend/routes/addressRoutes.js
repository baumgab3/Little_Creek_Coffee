const express = require('express');
const addressController = require('../controllers/addressController');
const {authenticateToken} = require('../authorize.js');

const router = express.Router();

router.get("/:addressType/:userId", authenticateToken, addressController.getAddressById);
router.post("/:addressType/:userId", authenticateToken, addressController.saveAddress);
router.delete("/:addressType/:userId", authenticateToken, addressController.deleteAddress);
router.get("/:userId", authenticateToken, addressController.getBillingAndShippingInfo);

module.exports = router;