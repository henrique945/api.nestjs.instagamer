//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { Type } from 'class-transformer';
import { PostEntity } from './post.entity';
import { BaseEntity } from '../../common/base-entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os comentários
 */
@Entity('comment')
export class CommentEntity extends BaseEntity {

  /**
   * O id do usuário associado ao comentário
   */
  @Column({ nullable: false })
  userId: number;

  /**
   * O id do post associado ao comentário
   */
  @Column({ nullable: false })
  postId: number;

  /**
   * O texto do comentário
   */
  @Column({ nullable: false })
  text: string;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => UserEntity })
  @ManyToOne(u => UserEntity, user => user.comments)
  @Type(() => UserEntity)
  public user: UserEntity;

  @ApiModelProperty({ type: type => PostEntity })
  @ManyToOne(u => PostEntity, post => post.comments)
  @Type(() => PostEntity)
  public post: PostEntity;

  /**
   * Construtor Padrão
   */
  constructor(partial: Partial<CommentEntity>) {
    super();

    // passa os valores da variável partial que contem as colunas da entidade para a class CommentEntity (this)
    Object.assign(this, partial);
  }

}
