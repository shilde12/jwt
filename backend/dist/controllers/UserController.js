"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
class UserController {
    async register(req, res) {
        const { email, password } = req.body;
        try {
            const user = await (await database_1.default).get("SELECT * FROM users WHERE email = ?", [
                email,
            ]);
            if (user) {
                return res.status(400).json({ error: "Usuário já existe" });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const result = await (await database_1.default).run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, hashedPassword, "user"]);
            res.status(201).json({
                message: "Usuário criado!",
                userId: result.lastID,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await (await database_1.default).get("SELECT * FROM users WHERE email = ?", [email]);
            if (!user) {
                return res.status(401).json({ error: "Dados inválidos!" });
            }
            const validPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Senha incorreta!" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "1h" });
            res.json({ token, role: user.role });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro no servidor" });
        }
    }
}
exports.UserController = UserController;
