"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, './.env') });
const config = {
    authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    service1Url: process.env.SERVICE_1_URL || 'http://localhost:3002',
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'default_key',
};
exports.default = config;
