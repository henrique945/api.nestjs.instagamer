//#region Imports

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';
import { VerifyProxy } from '../../../models/proxys/verify.proxy';
import { ChatEntity } from '../../../typeorm/entities/chat.entity';

//#endregion

/**
 * A classe que representa o serviço que lida com as conversas
 */
@Injectable()
export class ChatService extends TypeOrmCrudService<ChatEntity> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(ChatEntity) public repository: Repository<ChatEntity>,
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
