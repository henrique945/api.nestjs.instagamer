//#region Imports

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../../typeorm/entities/post.entity';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { UserModule } from '../user/user.module';
import { GameModule } from '../game/game.module';
import { UserGameModule } from '../user-game/user-game.module';

//#endregion

@Module({
  controllers: [
    PostController,
  ],
  providers: [
    PostService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
    ]),
    UserModule,
    GameModule,
    UserGameModule,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule {
}
