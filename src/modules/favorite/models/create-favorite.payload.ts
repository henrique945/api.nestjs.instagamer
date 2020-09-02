//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

import { BaseCrudCreatePayload } from '../../../common/base-crud-create.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa o payload enviado para criar um favorito
 */
export class CreateFavoritePayload extends BaseCrudCreatePayload {

  /**
   * O id do usuário associado ao favorito
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar um usuário.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public userId: number;

  /**
   * O id do post associado ao favorito
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar um post.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public postId: number;
}
