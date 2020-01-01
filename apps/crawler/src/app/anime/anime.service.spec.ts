import { Test } from '@nestjs/testing';

import { AnimeService } from './anime.service';

describe('AnimeService', () => {
  let service: AnimeService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AnimeService]
    }).compile();

    service = app.get<AnimeService>(AnimeService);
  });

  describe('getData', () => {
    it('should return "Welcome to crawler!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to crawler!' });
    });
  });
});
