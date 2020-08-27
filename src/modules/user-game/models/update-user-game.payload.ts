//#region Imports

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar um usuário-jogo
 */
export class UpdateUserGamePayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário associado
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userId?: number;

  /**
   * O id do jogo associado
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public gameId?: number;

}
