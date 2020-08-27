//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GameEntity } from '../../../typeorm/entities/game.entity';
import { UserGameEntity } from '../../../typeorm/entities/user-game.entity';
import { ApiModelProperty } from '@nestjs/swagger';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário-jogo
 */
export class UserGameProxy extends BaseCrudProxy {

  /**
   * O id do usuário associado
   */
  @ApiModelProperty()
  public userId: number;

  /**
   * O id do jogo associado
   */
  @ApiModelProperty()
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
