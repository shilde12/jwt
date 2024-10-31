"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../middleware/admin"));
const database_1 = __importDefault(require("../config/database"));
const router = express_1.default.Router();
router.get("/users", admin_1.default, async (req, res) => {
    const users = await database_1.default.all("SELECT * FROM users");
    res.json(users);
});
exports.default = router;
