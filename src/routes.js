import express from "express";
const router = express.Router();
import {
  getAllBooksHandler,
  addBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
} from "./handler.js";

// book route
router.get("/books", getAllBooksHandler);
router.post("/books", addBookHandler);
router.get("/books/:bookId", getBookByIdHandler);
router.put("/books/:bookId", updateBookByIdHandler);

export default router;
