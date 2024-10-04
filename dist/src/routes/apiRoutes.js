"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const authMiddleWare_1 = __importDefault(require("../middlewares/authMiddleWare"));
const config_1 = __importDefault(require("../../config"));
const router = (0, express_1.Router)();
router.post('/auth/register', (req, res) => {
    (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.default.authServiceUrl,
        changeOrigin: true,
        pathRewrite: { '^/auth/register': '/api/register' },
    })(req, res);
});
router.post('/auth/login', (req, res) => {
    (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.default.authServiceUrl,
        changeOrigin: true,
        pathRewrite: { '^/auth/login': '/api/login' },
    })(req, res);
});
router.use(authMiddleWare_1.default);
router.use('/api/service1', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: config_1.default.service1Url,
    changeOrigin: true,
    pathRewrite: { '^/api/service1': '' },
}));
router.get('/public', (req, res) => {
    res.send('Esta es una ruta pública que no requiere autenticación.');
});
exports.default = router;
