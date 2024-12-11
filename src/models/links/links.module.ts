import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksService } from './links.service';
import { LinksController } from 'src/controllers/links/links.controller';
import { Link } from '../../entities/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
