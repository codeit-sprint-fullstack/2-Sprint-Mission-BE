import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  client: S3Client;

  constructor(private config: ConfigService) {
    this.client = new S3Client({
      region: this.config.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(file: Express.Multer.File) {
    const uniqueSuffix = Date.now().toString();
    const ext = file.originalname.split('.').pop();
    const fileName = `${uniqueSuffix}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.config.get('AWS_BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: `image/${ext}`,
    });

    await this.client.send(command);

    return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${fileName}`;
  }
}
