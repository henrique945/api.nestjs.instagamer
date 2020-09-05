//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para atualizar um jogo
 */
export class UpdateGamePayload extends BaseCrudCreatePayload {

  /**
   * O nome do usuário
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public whoName?: string;

  /**
   * A descrição do jogo
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public whoDescription?: string;

  /**
   * A imagem título do jogo
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public titleImage?: string;

  /**
   * A lista de imagens do jogo
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray({ message: DefaultValidationMessages.IsArray })
  @IsString({ message: DefaultValidationMessages.IsString, each: true })
  public listImages?: string[];
}
