"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST;
app.use(apiRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API Gateway está corriendo');
});
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://${HOST}:${PORT}`);
});
