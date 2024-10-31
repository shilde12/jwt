import { Router } from "express";
import { UserController } from "../controllers//userController";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;