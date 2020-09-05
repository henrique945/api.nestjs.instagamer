//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserEntity } from './user.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com as conversas
 */
@Entity('chat')
export class ChatEntity extends BaseEntity {

  /**
   * O id do usuário que enviou a mensagem
   */
  @Column({ nullable: false })
  messageSentId: number;

  /**
   * O id do usuário que recebeu a mensagem
   */
  @Column({ nullable: false })
  messageReceivedId: number;

  /**
   * A mensagem da conversa
   */
  @Column({ nullable: false })
  message: string;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => UserEntity })
  @ManyToOne(u => UserEntity, user => user.messagesSent)
  @Type(() => UserEntity)
  public messageSent: UserEntity;

  @ApiModelProperty({ type: type => UserEntity })
  @ManyToOne(u => UserEntity, user => user.messagesReceived)
  @Type(() => UserEntity)
  public messageReceived: UserEntity;

  /**
   * Construtor Padrão
   */
  constructor(partial: Partial<ChatEntity>) {
    super();

    Object.assign(this, partial);
  }

}
