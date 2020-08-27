//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GameEntity } from '../../../typeorm/entities/game.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';
import { PostEntity } from '../../../typeorm/entities/post.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um post
 */
export class PostProxy extends BaseCrudProxy {

  /**
   * O nome do post
   */
  @ApiModelProperty()
  public name: string;

  /**
   * A descrição do post
   */
  @ApiModelPropertyOptional()
  public description?: string;

  /**
   * A imagem do post
   */
  @ApiModelPropertyOptional()
  public imageUrl?: string;

  /**
   * O id do usuário
   */
  @ApiModelProperty()
  public userId: number;

  /**
   * O id do game
   */
  @ApiModelProperty()
  public gameId: number;

  /**
   * Construtor padrão
   */
  constructor(
    entity: PostEntity,
  ) {
    super(entity);

    this.name = entity.name;
    this.description = entity.description;
    this.imageUrl = entity.imageUrl;
    this.userId = entity.userId;
    this.gameId = entity.gameId;
  }
}
