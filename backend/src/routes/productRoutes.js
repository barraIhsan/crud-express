import express from "express";
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
  updateProductById,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
