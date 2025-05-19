import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'api_testing',
    format: 'png',
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  }),
});
