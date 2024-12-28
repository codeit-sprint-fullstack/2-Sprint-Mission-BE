import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import {
  getSignedUrl,
  S3RequestPresigner,
} from '@aws-sdk/s3-request-presigner';
import { Hash } from '@aws-sdk/hash-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly bucketName: string;
  private readonly s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('BUCKET_NAME');
    this.s3Client = new S3Client({
      region: this.configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESSKEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESSKEY'),
      },
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, s3key: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Body: dataBuffer,
      Key: s3key,
      ContentDisposition: 'inline',
    });

    await this.s3Client.send(command);
    return s3key;
  }

  async generatePresignedUrl(filename: string, expiresIn: number = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
