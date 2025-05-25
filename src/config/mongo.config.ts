import { registerAs } from '@nestjs/config';
import { CONFIG_TOKEN } from './config.token';

export default registerAs(CONFIG_TOKEN.MONGO, () => ({
  mongoUri: process.env.MONGO_URI,
}));
