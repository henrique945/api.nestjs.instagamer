//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserGameEntity } from './user-game.entity';
import { PostEntity } from './post.entity';
import { WhoEntity } from './embedded/who.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os jogos
 */
@Entity('game')
export class GameEntity extends BaseEntity {

  /**
   * Quem é a entidade jogo
   */
  @Column(type => WhoEntity)
  who: WhoEntity;

  /**
   * A imagem título do jogo
   */
  @Column({ nullable: false })
  public titleImage: string;

  /**
   * A lista de imagens do jogo
   */
  @Column({ nullable: false, type: 'simple-json' })
  public listImages: string[];

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => PostEntity, isArray: true })
  @OneToMany(u => PostEntity, post => post.game)
  @Type(() => PostEntity)
  public posts: PostEntity[];

  @ApiModelProperty({ type: type => UserGameEntity, isArray: true })
  @OneToMany(u => UserGameEntity, userGame => userGame.game)
  @Type(() => UserGameEntity)
  public userGames: UserGameEntity[];

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<GameEntity>) {
    super();

    Object.assign(this, partial);
  }

}
