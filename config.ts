import dotenv from 'dotenv';
import path from 'path';

const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (result.error) {
  throw result.error;
}

interface Config {
  authServiceUrl: string;
  service1Url: string;
  jwtSecretKey: string;
}

const config: Config = {
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  service1Url: process.env.SERVICE_1_URL || 'http://localhost:3002',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'default_key',
};

export default config;
