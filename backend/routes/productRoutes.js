const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// endpoint: /product

router.get("/:param1", productController.getProductDetails);
router.get("/quick-veiw/:productId", productController.getProductDetailsShort);
router.get("/price/:productId", productController.getProductPrice);
router.get("/:productId/:category/similar", productController.getSimilarProducts);


module.exports = router;