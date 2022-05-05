import { GameService } from './game.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from '../game.module';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(GameService),
          useValue: {}
        },
      ],
    }).compile();

    gameService = await module.get<GameService>(GameService);
  });

  describe('Test game service after mock', () => {
    it('test getOne', async () => {
      expect(typeof await gameService.exists([1])).not.toEqual(null);
    });
  });
});