const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

// Product endpoints
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/multiple", productController.deleteMultipleProducts);

module.exports = router;
