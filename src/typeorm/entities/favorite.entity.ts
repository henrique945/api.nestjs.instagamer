import { Entity, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { Type } from 'class-transformer';
import { PostEntity } from './post.entity';
import { BaseEntity } from '../../common/base-entity';

/**
 * A classe que representa a entidade que lida com os favoritos
 */
@Entity('favorite')
export class FavoriteEntity extends BaseEntity {

  /**
   * O id do usuário associado ao favorito
   */
  userId: number;

  /**
   * O id do post associado ao favorito
   */
  postId: number;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => UserEntity })
  @ManyToOne(u => UserEntity, user => user.favorites)
  @Type(() => UserEntity)
  public user: UserEntity;

  @ApiModelProperty({ type: type => PostEntity })
  @ManyToOne(u => PostEntity, post => post.favorites)
  @Type(() => PostEntity)
  public post: PostEntity;

  /**
   * Construtor Padrão
   */
  constructor(partial: Partial<FavoriteEntity>) {
    super();

    Object.assign(this, partial);
  }

}
