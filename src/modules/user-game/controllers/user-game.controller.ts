//#region Imports

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  NotFoundException,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseCrudController } from '../../../common/base-crud.controller';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { isValid } from '../../../utils/functions';
import { NestJSRequest } from '../../../utils/type.shared';

import { UserGameEntity } from '../../../typeorm/entities/user-game.entity';
import { UserGameService } from '../services/user-game.service';
import { UserGameProxy } from '../models/user-game.proxy';
import { CreateUserGamePayload } from '../models/create-user-game.payload';
import { UpdateUserGamePayload } from '../models/update-user-game.payload';

//#endregion

/**
 * A classe que representa o controlador que lida com os usuário-jogos
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: UserGameEntity,
  },
  query: {
    join: {
      user: {},
      game: {},
    },
  },
  routes: {
    exclude: [
      'updateOneBase',
      'createManyBase',
    ],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('user-game')
@Controller('user-game')
export class UserGameController extends BaseCrudController<UserGameEntity, UserGameService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: UserGameService,
  ) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias informações da entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: UserGameProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<UserGameProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(UserGameProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: UserGameProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<UserGameProxy>> {
    const userGameId = +nestRequest.params.id;

    const { exists } = await this.service.exists([userGameId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(UserGameProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: UserGameProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreateUserGamePayload): Promise<CrudProxy<UserGameProxy>> {
    const userGame = this.getEntityFromPayload(payload);

    return await this.base.createOneBase(crudRequest, userGame).then(response => mapCrud(UserGameProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: UserGameProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdateUserGamePayload): Promise<CrudProxy<UserGameProxy>> {
    const userGameId = +nestRequest.params.id;

    const { exists } = await this.service.exists([userGameId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const game = this.getEntityFromPayload(payload, userGameId);

    return await this.service.repository.save(game).then(response => mapCrud(UserGameProxy, response));
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que retorna a entidade a partir de um payload
   *
   * @param payload As informações do payload
   * @param id A identificação do usuário
   * @param isUserAdmin Diz se é admin
   */
  private getEntityFromPayload(payload: CreateUserGamePayload | UpdateUserGamePayload, id?: number, isUserAdmin: boolean = false): UserGameEntity {
    return new UserGameEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.userId) && { userId: payload.userId },
      ...isValid(payload.gameId) && { gameId: payload.gameId },
    });
  }

  //#endregion

}
