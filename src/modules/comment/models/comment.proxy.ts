//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { CommentEntity } from '../../../typeorm/entities/comment.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { PostEntity } from '../../../typeorm/entities/post.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um comentário
 */
export class CommentProxy extends BaseCrudProxy {

  //#region Constructors

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
   * O texto do comentário
   */
  @ApiModelProperty()
  public text: string;

  /**
   * O usuário que fez o comentário
   */
  @ApiModelPropertyOptional()
  public user: UserEntity;

  /**
   * O post ao qual pertence o comentário
   */
  @ApiModelPropertyOptional()
  public post: PostEntity;

  //#endregion

}
