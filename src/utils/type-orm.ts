//#region Imports

import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { UserEntity } from '../typeorm/entities/user.entity';
import { GameEntity } from '../typeorm/entities/game.entity';
import { UserGameEntity } from '../typeorm/entities/user-game.entity';
import { PostEntity } from '../typeorm/entities/post.entity';
import { CommentEntity } from '../typeorm/entities/comment.entity';
import { FavoriteEntity } from '../typeorm/entities/favorite.entity';

//#endregion

/**
 * As entidades do Typeorm
 */
// tslint:disable-next-line:ban-types
export const TypeOrmEntities: Array<Function | string | EntitySchema> = [
  UserEntity,
  GameEntity,
  UserGameEntity,
  PostEntity,
  CommentEntity,
  FavoriteEntity,
];
