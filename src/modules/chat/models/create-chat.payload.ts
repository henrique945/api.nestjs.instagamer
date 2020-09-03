//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para criar uma conversa
 */
export class CreateChatPayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário que enviou a mensagem
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o usuário que envia a mensagem.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public messageSentId: number;

  /**
   * O id do usuário que recebeu a mensagem
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o usuário que recebe a mensagem.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public messageReceivedId: number;

  /**
   * A mensagem da conversa
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário o conteudo da conversa.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public message: string;
}
