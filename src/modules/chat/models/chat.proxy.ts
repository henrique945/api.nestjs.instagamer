//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiModelProperty } from '@nestjs/swagger';
import { CommentEntity } from '../../../typeorm/entities/comment.entity';
import { ChatEntity } from '../../../typeorm/entities/chat.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre uma conversa
 */
export class ChatProxy extends BaseCrudProxy {

  /**
   * O id do usuário que enviou a mensagem
   */
  @ApiModelProperty()
  public messageSentId: number;

  /**
   * O id do usuário que recebeu a mensagem
   */
  @ApiModelProperty()
  public messageReceivedId: number;

  /**
   * O texto do comentário
   */
  @ApiModelProperty()
  public message: string;

  /**
   * Construtor padrão
   */
  constructor(
    entity: ChatEntity,
  ) {
    super(entity);

    this.messageSentId = entity.messageSentId;
    this.messageReceivedId = entity.messageReceivedId;
    this.message = entity.message;
  }
}
