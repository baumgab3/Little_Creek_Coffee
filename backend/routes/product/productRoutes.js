const express = require('express');
const productController = require('../../controllers/product/productController');

const router = express.Router();

// route /users

router.get("/:param1", productController.getProductDetails);
router.get("/:productId/details", productController.getCoffeeDetails);


module.exports = router;