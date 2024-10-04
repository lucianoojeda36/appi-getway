"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    const secretKey = config_1.default.jwtSecretKey;
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            res.status(403).json({ error: 'Forbidden', message: err.message });
            return;
        }
        req.user = user;
        next();
    });
}
exports.default = authenticateToken;
