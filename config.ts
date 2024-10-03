import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
  authServiceUrl: string;
  service1Url: string;
  jwtSecretKey: string;
}

const config: Config = {
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  service1Url: process.env.SERVICE1_URL || 'http://localhost:3002',
  jwtSecretKey:
    process.env.JWT_SECRET_KEY ||
    process.env.SECRET_KEY ||
    'default_secret_key',
};

export default config;
