const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get("/:param1", productController.getProductDetails);

module.exports = router;