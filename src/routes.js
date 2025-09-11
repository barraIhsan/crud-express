import express from "express";
const router = express.Router();
import {
  getAllHandler,
  addHandler,
  getByIdHandler,
  updateByIdHandler,
  deleteByIdHandler,
} from "./handler.js";

router.get("/:type", getAllHandler);
router.post("/:type", addHandler);
router.get("/:type/:id", getByIdHandler);
router.put("/:type/:id", updateByIdHandler);
router.delete("/:type/:id", deleteByIdHandler);

export default router;
