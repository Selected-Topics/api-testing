// cloudinary.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import cloudinary from 'cloudinary';
import cloudinaryConfig from 'src/config/cloudinary.config';
import { CONFIG_TOKEN } from 'src/config/config.token';

export const CloudinaryProvider: Provider = {
  provide: CONFIG_TOKEN.CLOUDINARY,
  useFactory: (configService: ConfigType<typeof cloudinaryConfig>) => {
    console.log('Cloudinary config loaded');
    cloudinary.v2.config({
      cloud_name: configService.cloud_name,
      api_key: configService.api_key,
      api_secret: configService.api_secret,
    });

    return cloudinary.v2;
  },
  inject: [cloudinaryConfig.KEY],
};
