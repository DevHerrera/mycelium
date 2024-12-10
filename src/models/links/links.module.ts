import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksService } from './links.service';
//import { UsersController } from './users.controller';
import { Link } from '../../entities/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  //controllers: [UsersController],
})
export class LinksModule {}
