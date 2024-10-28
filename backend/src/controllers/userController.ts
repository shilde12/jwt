import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { database } from "../config/database";
import { User } from "../models/User";

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verificar se o usuário já existe
      database.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user) => {
          if (err) {
            return res.status(500).json({ error: "Database error" });
          }

          if (user) {
            return res.status(400).json({ error: "User already exists" });
          }

          // Criar novo usuário
          const hashedPassword = await bcrypt.hash(password, 10);

          database.run(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, hashedPassword, "user"],
            function (err) {
              if (err) {
                return res.status(500).json({ error: "Error creating user" });
              }

              res.status(201).json({
                message: "User created successfully",
                userId: this.lastID,
              });
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      database.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user: User) => {
          if (err) {
            return res.status(500).json({ error: "Database error" });
          }

          if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
          }

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
          }

          const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1h" }
          );

          res.json({ token, role: user.role });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
}