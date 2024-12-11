import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@nestjs-cognito/auth';
import { LinksService } from 'src/models/links/links.service';
import { Link } from '../../entities/link.entity';

@Controller('links')
export class LinksController {
  constructor(private readonly linkService: LinksService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async findAll(): Promise<Link[]> {
    return this.linkService.findAll();
  }
}
