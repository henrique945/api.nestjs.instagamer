//#region Imports

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './controllers/favorite.controller';
import { FavoriteService } from './services/favorite.service';
import { FavoriteEntity } from '../../typeorm/entities/favorite.entity';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

//#endregion

@Module({
  controllers: [
    FavoriteController,
  ],
  providers: [
    FavoriteService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      FavoriteEntity,
    ]),
    UserModule,
    PostModule,
  ],
  exports: [
    FavoriteService,
  ],
})
export class FavoriteModule {
}
