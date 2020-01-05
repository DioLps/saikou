import { Controller, Get, Param } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('api/anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}
  @Get()
  getAnimes() {
    return this.animeService.getData();
  }
  @Get('detail/:hash')
  getDetails(@Param('hash') hash: number) {
    return this.animeService.getDetails(hash);
  }
  @Get('episodes/:slug/:page?')
  getEpisodes(@Param('slug') slug: string, @Param('page') page?: number) {
    return this.animeService.getEpisodes(slug, page);
  }
}
