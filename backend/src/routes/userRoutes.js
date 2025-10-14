import express from "express";
import {
  createUsers,
  deleteUsersById,
  getUsers,
  getUsersById,
  updateUsersById,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/", createUsers);
router.put("/:id", updateUsersById);
router.delete("/:id", deleteUsersById);

export default router;
