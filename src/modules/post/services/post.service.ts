//#region Imports

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';
import { VerifyProxy } from '../../../models/proxys/verify.proxy';
import { PostEntity } from '../../../typeorm/entities/post.entity';

//#endregion

/**
 * A classe que representa o serviço que lida com os posts
 */
@Injectable()
export class PostService extends TypeOrmCrudService<PostEntity> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(PostEntity) public repository: Repository<PostEntity>,
  ) {
    super(repository);
  }

  //#endregion

  //#region Functions

  /**
   * Método que verifica se algumas entidades existem
   *
   * @param ids A lista de identificações das entidades
   */
  public async exists(ids: number[]): Promise<VerifyProxy> {
    const count = await this.repository.createQueryBuilder().whereInIds(ids).getCount();

    return new VerifyProxy(count === ids.length);
  }

  //#endregion
}
