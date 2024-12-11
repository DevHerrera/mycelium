import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private AWS_S3_BUCKET: string;
  constructor(private readonly configService: ConfigService) {
    this.AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET');
    const AWS_KEY = this.configService.get<string>('AWS_KEY');
    const AWS_SECRET_KEY = this.configService.get<string>('AWS_SECRET_KEY');
    this.s3 = new AWS.S3({
      accessKeyId: AWS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(
    file: Express.Multer.File['buffer'],
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      console.log({ s3Response });
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
