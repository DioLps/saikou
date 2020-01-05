import { Module } from '@nestjs/common';

import { VideoModule } from './video/video.module';
import { AnimeModule } from './anime/anime.module';
import { AppController } from './app.controller';

@Module({
  imports: [AnimeModule, VideoModule],
  controllers: [AppController]
})
export class AppModule {}
