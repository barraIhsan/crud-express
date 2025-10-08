import express from "express";
import {
  createProducts,
  deleteProductsById,
  getProducts,
  getProductsById,
  updateProductsById,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/", createProducts);
router.put("/:id", updateProductsById);
router.delete("/:id", deleteProductsById);

export default router;
