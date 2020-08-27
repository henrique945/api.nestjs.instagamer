//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNumber, IsString } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para criar um usuário-jogo
 */
export class CreateUserGamePayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário associado
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o id do usuário.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userId: number;

  /**
   * O id do jogo associado
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o id do jogo.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public gameId: number;

}
