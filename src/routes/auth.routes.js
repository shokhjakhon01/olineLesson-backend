import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
const router = Router();

router.post("/register", validate, authController.signUp);

router.post("/login", validate, authController.login);

export default router;
