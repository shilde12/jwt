import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../config/database";
import { User } from "../models/User";

export class UserController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await (await database).get("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (user) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await (await database).run(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, hashedPassword, "user"]
      );

      res.status(201).json({
        message: "Usuário criado!",
        userId: result.lastID,
      });
    } catch (error) {
      console.error(error); // Log do erro para depuração
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user: User = await (await database).get(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (!user) {
        return res.status(401).json({ error: "Dados inválidos!" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Senha incorreta!" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "1h" }
      );

      res.json({ token, role: user.role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  }
}