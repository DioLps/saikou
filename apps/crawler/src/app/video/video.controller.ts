import { Controller, Get, Param } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get(':key')
  getData(@Param('key') key: number) {
    return this.videoService.getVideo(key);
  }
}
