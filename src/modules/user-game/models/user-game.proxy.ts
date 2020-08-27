//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GameEntity } from '../../../typeorm/entities/game.entity';
import { UserGameEntity } from '../../../typeorm/entities/user-game.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário-jogo
 */
export class UserGameProxy extends BaseCrudProxy {

  /**
   * O id do usuário associado
   */
  public userId: number;

  /**
   * O id do jogo associado
   */
  public gameId: number;

  /**
   * Construtor padrão
   */
  constructor(
    entity: UserGameEntity,
  ) {
    super(entity);

    this.userId = entity.userId;
    this.gameId = entity.gameId;
  }
}
