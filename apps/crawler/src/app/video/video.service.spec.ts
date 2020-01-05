import { Test } from '@nestjs/testing';

import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [VideoService]
    }).compile();

    service = app.get<VideoService>(VideoService);
  });

  describe('getData', () => {
    it('should return "Welcome to crawler!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to crawler!' });
    });
  });
});
