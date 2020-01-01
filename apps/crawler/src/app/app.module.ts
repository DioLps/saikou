import { Module } from '@nestjs/common';

import { AnimeService } from './anime/anime.service';
import { VideoService } from './video/video.service';

import { AnimeController } from './anime/anime.controller';
import { VideoController } from './video/video.controller';

@Module({
  imports: [],
  controllers: [VideoController, AnimeController],
  providers: [AnimeService, VideoService]
})
export class AppModule {}
