//#region Imports

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { PostEntity } from '../../../typeorm/entities/post.entity';
import { UserGameEntity } from '../../../typeorm/entities/user-game.entity';
import { CommentEntity } from '../../../typeorm/entities/comment.entity';
import { FavoriteEntity } from '../../../typeorm/entities/favorite.entity';
import { ChatEntity } from '../../../typeorm/entities/chat.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário
 */
export class UserProxy extends BaseCrudProxy {

  //#region Constructors

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

    this.isEmailConfirmed = entity.isEmailConfirmed;
    this.roles = entity.roles;

    this.posts = entity.posts;
    this.userGames = entity.userGames;
    this.comments = entity.comments;
    this.favorites = entity.favorites;
    this.messagesSent = entity.messagesSent;
    this.messagesReceived = entity.messagesReceived;
  }

  //#endregion

  //#region Properties

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
   * Diz se o usuário já confirmou o email
   */
  @ApiModelProperty()
  public isEmailConfirmed: boolean;

  /**
   * As permissões desse usuário
   */
  @ApiModelProperty()
  public roles: string;

  /**
   * Os posts do usuário
   */
  @ApiModelPropertyOptional()
  public posts: PostEntity[];

  /**
   * Os usuário-jogos
   */
  @ApiModelPropertyOptional()
  public userGames: UserGameEntity[];

  /**
   * Os comentários que o usuário fez
   */
  @ApiModelPropertyOptional()
  public comments: CommentEntity[];

  /**
   * Os posts favoritos do usuário
   */
  @ApiModelPropertyOptional()
  public favorites: FavoriteEntity[];

  /**
   * As mensagens enviadas pelo usuário
   */
  @ApiModelPropertyOptional()
  public messagesSent: ChatEntity[];

  /**
   * As mesagens recebidas do usuário
   */
  @ApiModelPropertyOptional()
  public messagesReceived: ChatEntity[];

  //#endregion

}
