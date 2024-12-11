import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/services/aws/s3.service';
import { PageImageUploadController } from 'src/controllers/pages/upload/imageUpload.controller';
import { Page } from 'src/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [S3Service],
  controllers: [PageImageUploadController],
})
export class PagesModule {}
