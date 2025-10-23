import express from "express";
import {
  createUser,
  deleteUserById,
  getUser,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
