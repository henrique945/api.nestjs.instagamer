import { Test } from '@nestjs/testing';
import { provideRepository } from '../../test/repository.mock';
import { GameEntity } from '../../../typeorm/entities/game.entity';
import { Repository } from 'typeorm';
import { GameController } from '../controllers/game.controller';
import { GameProxy } from '../models/game.proxy';

const game = new GameProxy({
  id: 1,
  titleImage: '',
  listImages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  userGames: [],
  posts: [],
  isActive: true,
  who: {
    name: '', description: '',
  },
});

describe('GameService', () => {
  let gameController: GameController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GameController,
        provideRepository<GameEntity, Repository<GameEntity>>(new Repository<GameEntity>()),
      ],
    }).compile();

    gameController = moduleRef.get<GameController>(GameController);

    // const module = await Test.createTestingModule({
    //   providers: [
    //     GameService,
    //     {
    //       provide: getRepositoryToken(GameService),
    //       useValue: {},
    //     },
    //   ],
    // }).compile();

    // gameService = await module.get<GameService>(GameService);
  });

  describe('Test game service after mock', () => {
    it('test getOne', async () => {
      jest.spyOn(gameController, 'getOne').mockImplementation((_, gameId) => {
        expect(gameId).toBe(game.id);

        return Promise.resolve(game);
      });
    });
  });
});
