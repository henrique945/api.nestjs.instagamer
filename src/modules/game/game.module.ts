//#region Imports

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from '../../typeorm/entities/game.entity';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { UserGameModule } from '../user-game/user-game.module';

//#endregion

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
    forwardRef(() => UserGameModule),
  ],
  exports: [
    GameService,
  ],
})
export class GameModule {
}
