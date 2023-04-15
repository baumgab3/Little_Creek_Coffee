const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// endpoint: /product

router.get("/:param1", productController.getProductDetails);
// router.get("/:productId/details", productController.getCoffeeDetails);
router.get("/quick-veiw/:productId", productController.getProductDetailsShort);
router.get("/price/:productId", productController.getProductPrice);


module.exports = router;