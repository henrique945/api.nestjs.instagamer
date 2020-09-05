//#region Imports

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameEntity } from '../../typeorm/entities/user-game.entity';
import { UserGameService } from './services/user-game.service';
import { UserGameController } from './controllers/user-game.controller';
import { UserModule } from '../user/user.module';
import { GameModule } from '../game/game.module';

//#endregion

@Module({
  controllers: [
    UserGameController,
  ],
  providers: [
    UserGameService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserGameEntity,
    ]),
    UserModule,
    forwardRef(() => GameModule),
  ],
  exports: [
    UserGameService,
  ],
})
export class UserGameModule {
}
