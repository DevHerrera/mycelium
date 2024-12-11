import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/services/aws/s3.service';

@Controller('pages/upload')
export class PageImageUploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('backgroundImage')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.s3Service.uploadFile(file);
  }
}
