import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

interface CustomRequest extends Request {
  user?: any;
}

function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  const secretKey: string = config.jwtSecretKey;

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('Error verifying token:', err);
      res.status(403).json({ error: 'Forbidden', message: err.message });
      return;
    }
    req.user = user;
    next();
  });
}

export default authenticateToken;
