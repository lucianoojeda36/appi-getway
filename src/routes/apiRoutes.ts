import { Router, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import authenticateToken from '../middlewares/authMiddleWare';
import config from '../../config';

const router = Router();

router.post('/auth/register', (req, res) => {
  createProxyMiddleware({
    target: config.authServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/auth/register': '/api/register' },
  })(req, res);
});

router.post('/auth/login', (req, res) => {
  createProxyMiddleware({
    target: config.authServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/auth/login': '/api/login' },
  })(req, res);
});

router.use(authenticateToken);

router.use(
  '/api/service1',
  createProxyMiddleware({
    target: config.service1Url,
    changeOrigin: true,
    pathRewrite: { '^/api/service1': '' },
  }),
);

router.get('/public', (req: Request, res: Response): void => {
  res.send('Esta es una ruta pública que no requiere autenticación.');
});

export default router;
