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

import { PostEntity } from '../../../typeorm/entities/post.entity';
import { PostService } from '../services/post.service';
import { PostProxy } from '../models/post.proxy';
import { CreatePostPayload } from '../models/create-post.payload';
import { UpdatePostPayload } from '../models/update-post.payload';
import { UserService } from '../../user/services/user.service';
import { GameService } from '../../game/services/game.service';

//#endregion

/**
 * A classe que representa o controlador que lida com os post
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: PostEntity,
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
@ApiUseTags('post')
@Controller('post')
export class PostController extends BaseCrudController<PostEntity, PostService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: PostService,
    private readonly userService: UserService,
    private readonly gameService: GameService,
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
  @ApiOkResponse({ type: PostProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<PostProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(PostProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: PostProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<PostProxy>> {
    const postId = +nestRequest.params.id;

    const { exists } = await this.service.exists([postId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(PostProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: PostProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreatePostPayload): Promise<CrudProxy<PostProxy>> {
    const post = this.getEntityFromPayload(payload);

    const game = await this.gameService.findOne({ where: { id: post.gameId } });

    if (!game)
      throw new NotFoundException('Jogo não encontrado.');

    const user = await this.gameService.findOne({ where: { id: post.userId } });

    if (!user)
      throw new NotFoundException('Usuário não encontrado.');

    return await this.base.createOneBase(crudRequest, post).then(response => mapCrud(PostProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: PostProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdatePostPayload): Promise<CrudProxy<PostProxy>> {
    const postId = +nestRequest.params.id;

    const { exists } = await this.service.exists([postId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const post = this.getEntityFromPayload(payload, postId);

    const game = await this.gameService.findOne({ where: { id: post.gameId } });

    if (!game)
      throw new NotFoundException('Jogo não encontrado.');

    const user = await this.gameService.findOne({ where: { id: post.userId } });

    if (!user)
      throw new NotFoundException('Usuário não encontrado.');

    return await this.service.repository.save(post).then(response => mapCrud(PostProxy, response));
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
  private getEntityFromPayload(payload: CreatePostPayload | UpdatePostPayload, id?: number, isUserAdmin: boolean = false): PostEntity {
    return new PostEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.name) && { name: payload.name },
      ...isValid(payload.description) && { description: payload.description },
      ...isValid(payload.imageUrl) && { imageUrl: payload.imageUrl },
      ...isValid(payload.userId) && { userId: payload.userId },
      ...isValid(payload.gameId) && { gameId: payload.gameId },
    });
  }

  //#endregion

}
