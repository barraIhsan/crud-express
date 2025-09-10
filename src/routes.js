import express from "express";
const router = express.Router();
import {
  getAllBooksHandler,
  addBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  getAllProductsHandler,
  addProductHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
  deleteBookByIdHandler,
  deleteProductByIdHandler,
} from "./handler.js";

// book route
router.get("/books", getAllBooksHandler);
router.post("/books", addBookHandler);
router.get("/books/:bookId", getBookByIdHandler);
router.put("/books/:bookId", updateBookByIdHandler);
router.delete("/books/:bookId", deleteBookByIdHandler);

// product route
router.get("/products", getAllProductsHandler);
router.post("/products", addProductHandler);
router.get("/products/:productId", getProductByIdHandler);
router.put("/products/:productId", updateProductByIdHandler);
router.delete("/products/:productId", deleteProductByIdHandler);

export default router;
