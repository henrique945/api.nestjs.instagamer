//#region Imports

import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { UserEntity } from '../typeorm/entities/user.entity';
import { GameEntity } from '../typeorm/entities/game.entity';

//#endregion

/**
 * As entidades do Typeorm
 */
  // tslint:disable-next-line:ban-types
export const TypeOrmEntities: Array<Function | string | EntitySchema> = [
    UserEntity,
    GameEntity,
  ];
