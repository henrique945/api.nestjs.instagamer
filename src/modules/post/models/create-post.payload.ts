//#region Imports

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para criar um post
 */
export class CreatePostPayload extends BaseCrudCreatePayload {

  /**
   * O nome do post
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar um nome.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public whoName: string;

  /**
   * A descrição do post
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public whoDescription?: string;

  /**
   * A imagem do post
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public imageUrl?: string;

  /**
   * O id do usuário
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o id do usuário.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userId: number;

  /**
   * O id do game
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o id do jogo.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public gameId: number;
}
