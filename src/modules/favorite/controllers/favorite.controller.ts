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

import { FavoriteEntity } from '../../../typeorm/entities/favorite.entity';
import { FavoriteService } from '../services/favorite.service';
import { UserService } from '../../user/services/user.service';
import { PostService } from '../../post/services/post.service';
import { FavoriteProxy } from '../models/favorite.proxy';
import { CreateFavoritePayload } from '../models/create-favorite.payload';
import { UpdateFavoritePayload } from '../models/update-favorite.payload';

//#endregion

/**
 * A classe que representa o controlador que lida com os favoritos
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: FavoriteEntity,
  },
  query: {
    join: {
      user: {
        exclude: ['password'],
      },
      post: {},
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
@ApiUseTags('favorite')
@Controller('favorite')
export class FavoriteController extends BaseCrudController<FavoriteEntity, FavoriteService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: FavoriteService,
    private readonly userService: UserService,
    private readonly postService: PostService,
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
  @ApiOkResponse({ type: FavoriteProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<FavoriteProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(FavoriteProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: FavoriteProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<FavoriteProxy>> {
    const favoriteId = +nestRequest.params.id;

    const { exists } = await this.service.exists([favoriteId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(FavoriteProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: FavoriteProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreateFavoritePayload): Promise<CrudProxy<FavoriteProxy>> {
    const favorite = this.getEntityFromPayload(payload);

    const userExists = await this.userService.exists([favorite.userId]);

    if (!userExists)
      throw new NotFoundException('Usuário não encontrado.');

    const postExists = await this.postService.exists([favorite.postId]);

    if (!postExists)
      throw new NotFoundException('Post não encontrado.');

    return await this.base.createOneBase(crudRequest, favorite).then(response => mapCrud(FavoriteProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: FavoriteProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdateFavoritePayload): Promise<CrudProxy<FavoriteProxy>> {
    const favoriteId = +nestRequest.params.id;

    const { exists } = await this.service.exists([favoriteId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const favorite = this.getEntityFromPayload(payload, favoriteId);

    const userExists = await this.userService.exists([favorite.userId]);

    if (!userExists)
      throw new NotFoundException('Usuário não encontrado.');

    const postExists = await this.postService.exists([favorite.postId]);

    if (!postExists)
      throw new NotFoundException('Post não encontrado.');

    return await this.service.repository.save(favorite).then(response => mapCrud(FavoriteProxy, response));
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
  private getEntityFromPayload(payload: CreateFavoritePayload | UpdateFavoritePayload, id?: number, isUserAdmin: boolean = false): FavoriteEntity {
    return new FavoriteEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.userId) && { userId: payload.userId },
      ...isValid(payload.postId) && { postId: payload.postId },
    });
  }

  //#endregion

}
