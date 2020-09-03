//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar uma conversa
 */
export class UpdateChatPayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário que enviou a mensagem
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public messageSentId?: number;

  /**
   * O id do usuário que recebeu a mensagem
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public messageReceivedId?: number;

  /**
   * A mensagem da conversa
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public message?: string;
}
