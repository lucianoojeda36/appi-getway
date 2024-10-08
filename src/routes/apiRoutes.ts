import { Router, Request, Response } from 'express';
import axios from 'axios';
import authenticateToken from '../middlewares/authMiddleWare';
import config from '../../config';

const router = Router();

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${config.authServiceUrl}/api/register`,
      req.body,
    );
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Error en el registro:', error.response?.data);
    res
      .status(error.response?.status || 500)
      .json({ message: 'Error al procesar la solicitud de registro' });
  }
});

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${config.authServiceUrl}/api/login`,
      req.body,
    );
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Error en el inicio de sesión:', error.response?.data);
    res
      .status(error.response?.status || 500)
      .json({ message: 'Error al procesar la solicitud de inicio de sesión' });
  }
});

router.use(authenticateToken);

router.use('/api/service1', async (req: Request, res: Response) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${config.service1Url}${req.originalUrl.replace(
        '/api/service1',
        '',
      )}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Error en el servicio 1:', error.response?.data);
    res
      .status(error.response?.status || 500)
      .json({ message: 'Error al procesar la solicitud del servicio 1' });
  }
});

router.get('/public', (req: Request, res: Response): void => {
  res.send('Esta es una ruta pública que no requiere autenticación.');
});

export default router;
