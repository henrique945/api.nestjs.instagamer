//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserGameEntity } from './user-game.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os jogos
 */
@Entity('game')
export class GameEntity extends BaseEntity {

  /**
   * O nome do jogo
   */
  @Column({ nullable: false })
  public name: string;

  /**
   * A descrição do jogo
   */
  @Column({ nullable: false })
  public description: string;

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
  // @ApiModelProperty({ type: type => PostEntity, isArray: true })
  // @OneToMany(u => PostEntity, post => post.game)
  // @Type(() => PostEntity)
  // public posts: PostEntity[];

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
