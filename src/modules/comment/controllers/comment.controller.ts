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

import { CommentEntity } from '../../../typeorm/entities/comment.entity';
import { CommentService } from '../services/comment.service';
import { CommentProxy } from '../models/comment.proxy';
import { CreateCommentPayload } from '../models/create-comment.payload';
import { UpdateCommentPayload } from '../models/update-comment.payload';
import { UserService } from '../../user/services/user.service';
import { PostService } from '../../post/services/post.service';

//#endregion

/**
 * A classe que representa o controlador que lida com os comentários
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: CommentEntity,
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
@ApiUseTags('comment')
@Controller('comment')
export class CommentController extends BaseCrudController<CommentEntity, CommentService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: CommentService,
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
  @ApiOkResponse({ type: CommentProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<CommentProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(CommentProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: CommentProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<CommentProxy>> {
    const commentId = +nestRequest.params.id;

    const { exists } = await this.service.exists([commentId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(CommentProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: CommentProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreateCommentPayload): Promise<CrudProxy<CommentProxy>> {
    const comment = this.getEntityFromPayload(payload);

    const userExists = await this.userService.exists([comment.userId]);

    if (!userExists)
      throw new NotFoundException('Usuário não encontrado.');

    const postExists = await this.postService.exists([comment.postId]);

    if (!postExists)
      throw new NotFoundException('Post não encontrado.');

    return await this.base.createOneBase(crudRequest, comment).then(response => mapCrud(CommentProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: CommentProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdateCommentPayload): Promise<CrudProxy<CommentProxy>> {
    const commentId = +nestRequest.params.id;

    const { exists } = await this.service.exists([commentId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const comment = this.getEntityFromPayload(payload, commentId);

    const userExists = await this.userService.exists([comment.userId]);

    if (!userExists)
      throw new NotFoundException('Usuário não encontrado.');

    const postExists = await this.postService.exists([comment.postId]);

    if (!postExists)
      throw new NotFoundException('Post não encontrado.');

    return await this.service.repository.save(comment).then(response => mapCrud(CommentProxy, response));
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
  private getEntityFromPayload(payload: CreateCommentPayload | UpdateCommentPayload, id?: number, isUserAdmin: boolean = false): CommentEntity {
    return new CommentEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.userId) && { userId: payload.userId },
      ...isValid(payload.postId) && { postId: payload.postId },
      ...isValid(payload.text) && { text: payload.text },
    });
  }

  //#endregion

}
