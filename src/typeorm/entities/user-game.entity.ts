//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserEntity } from './user.entity';
import { GameEntity } from './game.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os jogos que os usuário seguem
 */
@Entity('user-game')
export class UserGameEntity extends BaseEntity {

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
  @ManyToOne(u => UserEntity, user => user.userGames)
  @Type(() => UserEntity)
  public user: UserEntity;

  @ApiModelProperty({ type: type => GameEntity })
  @ManyToOne(u => GameEntity, game => game.userGames)
  @Type(() => GameEntity)
  public game: GameEntity;

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<UserGameEntity>) {
    super();

    Object.assign(this, partial);
  }

}
