//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { FavoriteEntity } from '../../../typeorm/entities/favorite.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { PostEntity } from '../../../typeorm/entities/post.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um favorito
 */
export class FavoriteProxy extends BaseCrudProxy {

  //#region Constructors

  /**
   * Construtor padrão
   */
  constructor(
    entity: FavoriteEntity,
  ) {
    super(entity);

    this.userId = entity.userId;
    this.postId = entity.postId;

    this.user = entity.user;
    this.post = entity.post;
  }

  //#endregion

  //#region Properties

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
   * O usuário dono do favorito
   */
  @ApiModelPropertyOptional()
  public user: UserEntity;

  /**
   * O post que foi favoritado
   */
  @ApiModelPropertyOptional()
  public post: PostEntity;

  //#endregion

}
