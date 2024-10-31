import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(403).json({ message: "Token faltando!" });
  }

  jwt.verify(
    token!.toString(),
    process.env.JWT_SECRET || "fallback_secret",
    (error) => {
      if (error) {
        return res.status(403).json({ message: "Token inválido!" });
      }

      next();
    }
  );
};