import { Router, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import authenticateToken from '../middlewares/authMiddleWare';

const router = Router();

const AUTH_SERVICE_URL: string = 'http://localhost:8000';
const SERVICE1_URL: string = 'http://localhost:5000';

router.post('/auth/register', (req, res) => {
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/auth/register': '/api/register' },
  })(req, res);
});

router.post('/auth/login', (req, res) => {
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/auth/login': '/api/login' },
  })(req, res);
});

router.use(authenticateToken);

router.use(
  '/api/service1',
  createProxyMiddleware({
    target: SERVICE1_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/service1': '' },
  }),
);

router.get('/public', (req: Request, res: Response): void => {
  res.send('Esta es una ruta pública que no requiere autenticación.');
});

export default router;
