import express from "express";
import { body } from "express-validator";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// all routes protected
router.use(authMiddleware);

router.post(
  "/",
  [body("title").notEmpty().withMessage("Title required")],
  validate,
  createTask,
);
router.get("/", getTasks);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
