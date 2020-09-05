//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GameEntity } from '../../../typeorm/entities/game.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { PostEntity } from '../../../typeorm/entities/post.entity';
import { UserGameEntity } from '../../../typeorm/entities/user-game.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um jogo
 */
export class GameProxy extends BaseCrudProxy {

  //#region Constructors

  /**
   * Construtor padrão
   */
  constructor(
    entity: GameEntity,
  ) {
    super(entity);

    this.name = entity.who.name;
    this.description = entity.who.description;
    this.listImages = entity.listImages;
    this.titleImage = entity.titleImage;

    this.posts = entity.posts;
    this.userGames = entity.userGames;
  }

  //#endregion

  //#region Properties

  /**
   * O nome do usuário
   */
  @ApiModelProperty()
  public name: string;

  /**
   * A descrição do jogo
   */
  @ApiModelProperty()
  public description: string;

  /**
   * A imagem título do jogo
   */
  @ApiModelProperty()
  public titleImage: string;

  /**
   * A lista de imagens do jogo
   */
  @ApiModelProperty()
  public listImages: string[];

  /**
   * Os post sobre o jogo
   */
  @ApiModelPropertyOptional()
  public posts: PostEntity[];

  /**
   * A tabela de relação entre usuário e jogos
   */
  @ApiModelPropertyOptional()
  public userGames: UserGameEntity[];

  //#endregion

}
