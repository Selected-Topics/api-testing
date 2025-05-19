import { registerAs } from '@nestjs/config';
import { CONFIG_TOKEN } from './config.token';

export default registerAs(CONFIG_TOKEN.CLOUDINARY, () => ({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}));
