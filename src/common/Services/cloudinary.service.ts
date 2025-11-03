import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiOptions,
} from 'cloudinary';
import * as streamifier from 'streamifier'; 
@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    path = "/public",
    options?: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    try {
      return await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: `slack/${path}`, resource_type: 'image', ...options },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Upload result is undefined'));
            resolve(result);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary upload failed: ' + err.message,
      );
    }
  }

  async deleteImage(publicId: string) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary delete failed: ' + err.message,
      );
    }
  }
}
