const express = require('express');
const productCategoryController = require('../controllers/productCategoryController');

const router = express.Router();

router.get("/:param1/:param2?", productCategoryController.getProductPreviews);

module.exports = router;