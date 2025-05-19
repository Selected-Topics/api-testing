import { registerAs } from '@nestjs/config';
import { CONFIG_TOKEN } from './config.token';

export default registerAs(CONFIG_TOKEN.JWT, () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION || '15m',
}));
