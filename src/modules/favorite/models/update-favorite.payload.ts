//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar um favorito
 */
export class UpdateFavoritePayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário associado ao favorito
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userId?: number;

  /**
   * O id do post associado ao favorito
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public postId?: number;
}
