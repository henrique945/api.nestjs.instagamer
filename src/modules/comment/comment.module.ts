//#region Imports

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controllers/comment.controller';
import { CommentEntity } from '../../typeorm/entities/comment.entity';
import { CommentService } from './services/comment.service';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';

//#endregion

@Module({
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
    ]),
    UserModule,
    PostModule,
  ],
  exports: [
    CommentService,
  ],
})
export class CommentModule {
}
