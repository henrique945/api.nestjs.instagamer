//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para criar um jogo
 */
export class CreateGamePayload extends BaseCrudCreatePayload {

  /**
   * O nome do usuário
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar um nome.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name: string;

  /**
   * A descrição do jogo
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar uma descrição.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public description: string;

  /**
   * A imagem título do jogo
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar uma imagem para título do jogo.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public titleImage: string;

  /**
   * A lista de imagens do jogo
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar uma lista de imagens.' })
  @IsArray({ message: DefaultValidationMessages.IsArray })
  @IsString({ message: DefaultValidationMessages.IsString, each: true })
  public listImages: string[];
}
