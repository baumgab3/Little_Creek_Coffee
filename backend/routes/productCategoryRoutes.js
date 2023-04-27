const express = require('express');
const productCategoryController = require('../controllers/productCategoryController');

const router = express.Router();

// endpoint: /product-category

router.get("/:param1/:param2?", productCategoryController.getProductPreviews);

module.exports = router;