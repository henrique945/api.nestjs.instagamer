//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ChatEntity } from '../../../typeorm/entities/chat.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';

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
   * O usuário que enviou a mensagem
   */
  @ApiModelPropertyOptional()
  public messageSent: UserEntity;

  /**
   * O usuário que recebeu a mensagem
   */
  @ApiModelPropertyOptional()
  public messageReceived: UserEntity;

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

    this.messageSent = entity.messageSent;
    this.messageReceived = entity.messageReceived;
  }
}
