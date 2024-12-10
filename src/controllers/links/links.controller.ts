import { Controller, Get } from '@nestjs/common';

import { LinksService } from 'src/models/links/links.service';
import { Link } from '../../entities/link.entity';

@Controller('links')
export class LinksController {
  constructor(private readonly linkService: LinksService) {}

  @Get()
  async findAll(): Promise<Link[]> {
    return this.linkService.findAll();
  }
}
