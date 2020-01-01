import { Controller, Get } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}
  @Get()
  async getAnimes() {
    return await this.animeService.getData();
  }
}
