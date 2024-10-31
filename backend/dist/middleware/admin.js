"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function adminMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    jsonwebtoken_1.default.verify(token, "seu_segredo", (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") {
            return res.status(403).json({ message: "Acesso negado" });
        }
        const decodedToken = decoded;
        if (decodedToken.role !== "admin") {
            return res.status(403).json({ message: "Acesso negado" });
        }
        req.userId = decodedToken.id;
        next();
    });
}
exports.default = adminMiddleware;
