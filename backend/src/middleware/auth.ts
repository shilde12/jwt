import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-token"];

  if (!token) {
    res.status(403).json({ message: "Token faltando!" })
  }

  jwt.verify(token!.toString(), "senha", (error) => {
    if (error) {
      res.status(403).json({ message: "Token inválido!" })
    }

    next();
  })
};