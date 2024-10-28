import { Router } from "express";
import { login, register } from "../controllers/userController";
import { authenticateJWT } from "../middleware/authMiddleware"; // Importando o middleware

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/dashboard", authenticateJWT, (req, res) => {
  res.json({ message: "Welcome to your dashboard!", user: req.user });
});

export default router;