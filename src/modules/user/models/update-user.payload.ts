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
   * A data de nascimento do usuário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsDate({ message: 'É ncessário enviar uma data correta' })
  @Transform(value => new Date(value))
  public birthday?: Date;
}
