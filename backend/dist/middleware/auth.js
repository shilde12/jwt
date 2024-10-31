"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers["x-token"];
    if (!token) {
        return res.status(403).json({ message: "Token faltando!" });
    }
    jsonwebtoken_1.default.verify(token.toString(), process.env.JWT_SECRET || "fallback_secret", (error) => {
        if (error) {
            return res.status(403).json({ message: "Token inválido!" });
        }
        next();
    });
};
exports.authMiddleware = authMiddleware;
