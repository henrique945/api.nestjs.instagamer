//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiModelProperty } from '@nestjs/swagger';
import { CommentEntity } from '../../../typeorm/entities/comment.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um comentário
 */
export class CommentProxy extends BaseCrudProxy {

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
   * O texto do comentário
   */
  @ApiModelProperty()
  public text: string;

  /**
   * Construtor padrão
   */
  constructor(
    entity: CommentEntity,
  ) {
    super(entity);

    this.userId = entity.userId;
    this.postId = entity.postId;
    this.text = entity.text;
  }
}
