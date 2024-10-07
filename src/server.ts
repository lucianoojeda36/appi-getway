import express, { Request, Response } from 'express';
import apiRoutes from './routes/apiRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
const HOST: string | undefined = process.env.HOST;

app.use(apiRoutes);

app.get('/', (req: Request, res: Response): void => {
  res.send('API Gateway está corriendo');
});

app.listen(PORT, (): void => {
  console.log(`API Gateway corriendo en http://${HOST}:${PORT}`);
});

console.log('---------hola mundo---------');
