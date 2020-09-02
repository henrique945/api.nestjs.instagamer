//#region Imports

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserEntity } from './user.entity';
import { GameEntity } from './game.entity';
import { CommentEntity } from './comment.entity';
import { FavoriteEntity } from './favorite.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os posts
 */
@Entity('post')
export class PostEntity extends BaseEntity {

  /**
   * O nome do post
   */
  @Column({ nullable: false })
  public name: string;

  /**
   * A descrição do post
   */
  @Column({ nullable: true })
  public description?: string;

  /**
   * A imagem do post
   */
  @Column({ nullable: true })
  public imageUrl?: string;

  /**
   * O id do usuário associado
   */
  @Column({ nullable: false })
  public userId: number;

  /**
   * O id do jogo associado
   */
  @Column({ nullable: false })
  public gameId: number;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => UserEntity })
  @ManyToOne(u => UserEntity, user => user.posts)
  @Type(() => UserEntity)
  public user: UserEntity;

  @ApiModelProperty({ type: type => GameEntity })
  @ManyToOne(u => GameEntity, game => game.posts)
  @Type(() => GameEntity)
  public game: GameEntity;

  @ApiModelProperty({ type: type => CommentEntity, isArray: true })
  @OneToMany(u => CommentEntity, comment => comment.post)
  @Type(() => CommentEntity)
  public comments: CommentEntity[];

  @ApiModelProperty({ type: type => FavoriteEntity, isArray: true })
  @OneToMany(u => FavoriteEntity, favorite => favorite.post)
  @Type(() => FavoriteEntity)
  public favorites: FavoriteEntity[];

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<PostEntity>) {
    super();

    Object.assign(this, partial);
  }

}
