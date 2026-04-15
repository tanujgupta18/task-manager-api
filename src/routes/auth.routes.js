import express from "express";
import { body } from "express-validator";

import { getProfile, login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  validate,
  register,
);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);

export default router;
