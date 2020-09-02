//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar um comentário
 */
export class UpdateCommentPayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário associado ao comentário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userId?: number;

  /**
   * O id do post associado ao comentário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public postId?: number;

  /**
   * O texto do comentário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public text?: string;
}
