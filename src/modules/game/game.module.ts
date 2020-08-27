import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from '../../typeorm/entities/game.entity';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';

@Module({
  controllers: [
    GameController,
  ],
  providers: [
    GameService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      GameEntity,
    ]),
  ],
  exports: [
    GameService,
  ],
})
export class GameModule {
}
