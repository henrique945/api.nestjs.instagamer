//#region Imports

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseCrudController } from '../../../common/base-crud.controller';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { isValid } from '../../../utils/functions';
import { NestJSRequest } from '../../../utils/type.shared';

import { GameEntity } from '../../../typeorm/entities/game.entity';
import { GameService } from '../services/game.service';
import { GameProxy } from '../models/game.proxy';
import { UpdateGamePayload } from '../models/update-game.payload';
import { CreateGamePayload } from '../models/create-game.payload';
import { UserGameService } from '../../user-game/services/user-game.service';

//#endregion

/**
 * A classe que representa o controlador que lida com os jogos
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: GameEntity,
  },
  query: {
    join: {
      posts: {},
      userGames: {},
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
@ApiUseTags('game')
@Controller('game')
export class GameController extends BaseCrudController<GameEntity, GameService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: GameService,
    private readonly userGamesService: UserGameService,
  ) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  @Get('/list')
  @ApiOperation({ title: 'Lista os jogos que o usuário segue para fazer a postagem.' })
  @ProtectTo('user', 'admin')
  public async listGameThatUserCanPost(@Request() nestRequest: NestJSRequest): Promise<CrudProxy<GameProxy>> {
    const userGames = await this.userGamesService.find({
      where: {
        userId: +nestRequest.user.id,
      },
      relations: ['game'],
    });

    const listGames = userGames.map(item => {
      return item.game;
    });

    return mapCrud(GameProxy, listGames);
  }

  /**
   * Método que retorna várias informações da entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: GameProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<GameProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(GameProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: GameProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<GameProxy>> {
    const gameId = +nestRequest.params.id;

    const { exists } = await this.service.exists([gameId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(GameProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: GameProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreateGamePayload): Promise<CrudProxy<GameProxy>> {
    const game = this.getEntityFromPayload(payload);

    return await this.base.createOneBase(crudRequest, game).then(response => mapCrud(GameProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: GameProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdateGamePayload): Promise<CrudProxy<GameProxy>> {
    const gameId = +nestRequest.params.id;

    const { exists } = await this.service.exists([gameId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const game = this.getEntityFromPayload(payload, gameId);

    return await this.service.repository.save(game).then(response => mapCrud(GameProxy, response));
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
  private getEntityFromPayload(payload: CreateGamePayload | UpdateGamePayload, id?: number, isUserAdmin: boolean = false): GameEntity {
    return new GameEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.name) && { name: payload.name },
      ...isValid(payload.description) && { description: payload.description },
      ...isValid(payload.listImages) && { listImages: payload.listImages },
      ...isValid(payload.titleImage) && { titleImage: payload.titleImage },
    });
  }

  //#endregion

}
