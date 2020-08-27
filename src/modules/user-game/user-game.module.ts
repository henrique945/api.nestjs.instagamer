import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameEntity } from '../../typeorm/entities/user-game.entity';
import { UserGameService } from './services/user-game.service';
import { UserGameController } from './controllers/user-game.controller';

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
  ],
  exports: [
    UserGameService,
  ],
})
export class UserGameModule {
}
