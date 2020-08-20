//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { Transform } from 'class-transformer';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar um usuário
 */
export class UpdateUserPayload extends BaseCrudCreatePayload {

  /**
   * O nome do usuário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public name?: string;

  /**
   * O cpf do usuário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public cpf?: string;

  /**
   * A descrição atual do usuário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public description?: string;
}
