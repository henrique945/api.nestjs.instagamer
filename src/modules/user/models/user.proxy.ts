//#region Imports

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { UserEntity } from '../../../typeorm/entities/user.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário
 */
export class UserProxy extends BaseCrudProxy {

  /**
   * O e-mail do usuário
   */
  @ApiModelProperty()
  public email: string;

  /**
   * O nome do usuário
   */
  @ApiModelProperty()
  public name: string;

  /**
   * O cpf do usuário
   */
  @ApiModelProperty()
  public cpf: string;

  /**
   * A descrição do usuário
   */
  @ApiModelPropertyOptional()
  public description?: string;

  /**
   * As permissões desse usuário
   */
  @ApiModelProperty()
  public roles: string;

  /**
   * Construtor padrão
   */
  constructor(
    entity: UserEntity,
  ) {
    super(entity);

    this.email = entity.email;
    this.name = entity.name;
    this.cpf = entity.cpf;
    this.description = entity.description;

    this.roles = entity.roles;
  }
}
