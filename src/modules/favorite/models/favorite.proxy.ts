//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiModelProperty } from '@nestjs/swagger';
import { FavoriteEntity } from '../../../typeorm/entities/favorite.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um favorito
 */
export class FavoriteProxy extends BaseCrudProxy {

  /**
   * O id do usuário associado ao comentário
   */
  @ApiModelProperty()
  public userId: number;

  /**
   * O id do post associado ao comentário
   */
  @ApiModelProperty()
  public postId: number;

  /**
   * Construtor padrão
   */
  constructor(
    entity: FavoriteEntity,
  ) {
    super(entity);

    this.userId = entity.userId;
    this.postId = entity.postId;
  }
}
