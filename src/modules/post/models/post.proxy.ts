//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GameEntity } from '../../../typeorm/entities/game.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { PostEntity } from '../../../typeorm/entities/post.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { CommentEntity } from '../../../typeorm/entities/comment.entity';
import { FavoriteEntity } from '../../../typeorm/entities/favorite.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um post
 */
export class PostProxy extends BaseCrudProxy {

  //#region Constructors

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

    this.game = entity.game;
    this.user = entity.user;
    this.comments = entity.comments;
    this.favorites = entity.favorites;
  }

  //#endregion

  //#region Properties

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
   * O jogo sobre qual o post fala
   */
  @ApiModelPropertyOptional()
  public game: GameEntity;

  /**
   * O usuário que criou o post
   */
  @ApiModelPropertyOptional()
  public user: UserEntity;

  /**
   * Os comentários do post
   */
  @ApiModelPropertyOptional()
  public comments: CommentEntity[];

  /**
   * A relação de usuários que favoritou o post
   */
  @ApiModelPropertyOptional()
  public favorites: FavoriteEntity[];

  //#endregion

}
