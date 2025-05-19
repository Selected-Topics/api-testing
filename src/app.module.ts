import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import cloudinaryConfig from './config/cloudinary.config';
import jwtConfig from './config/jwt.config';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, cloudinaryConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/api-testing'),
    CloudinaryModule,
  ],
  controllers: [UploadController],
  providers: [],
})
export class AppModule {}
