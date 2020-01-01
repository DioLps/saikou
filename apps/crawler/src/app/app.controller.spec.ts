import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AnimeService } from './anime/anime.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AnimeService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to crawler!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({message: 'Welcome to crawler!'});
    });
  });
});
