import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AnimeService } from './anime/anime.service';
import { AnimeController } from './anime/anime.controller';

@Module({
  imports: [],
  controllers: [AppController, AnimeController],
  providers: [AnimeService]
})
export class AppModule {}
