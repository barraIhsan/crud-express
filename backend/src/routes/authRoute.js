import express from "express";
import {
  loginHandler,
  registerHandler,
} from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);

export default authRouter;
