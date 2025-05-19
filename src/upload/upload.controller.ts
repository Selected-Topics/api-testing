/* eslint-disable @typescript-eslint/require-await */
// upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './cloudinary-storage';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // Save file details to MongoDB
    return {
      url: file.path,
      public_id: file.filename,
    };
  }
}
