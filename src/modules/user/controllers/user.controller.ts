//#region Imports

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Request,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseCrudController } from '../../../common/base-crud.controller';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { isAdmin, isAdminUser, isValid } from '../../../utils/functions';
import { NestJSRequest } from '../../../utils/type.shared';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../../typeorm/entities/user.entity';

//#endregion

/**
 * A classe que representa o controlador que lida com os usuários!
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    exclude: ['password'],
    join: {
      userGames: {},
      posts: {},
      favorites: {},
      comments: {},
      messagesSent: {},
      messagesReceived: {},
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
@ApiUseTags('user')
@Controller('user')
export class UserController extends BaseCrudController<UserEntity, UserService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: UserService,
  ) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que verifica a autenticação do usuário
   */
  @Get('/verify/code/:code')
  @ApiOperation({ title: 'Método que verifica o email do usuário' })
  @ProtectTo('user', 'admin')
  @ApiImplicitParam({ name: 'code' })
  public async verify2FactoryAuth(@Request() nestRequest: NestJSRequest, @Param('code') code: string): Promise<boolean> {
    const user = await this.service.findOne({ where: { id: nestRequest.user.id } });

    if (!user)
      throw new NotFoundException('Usuário náo encontrado.');

    return code === user.code;
  }

  /**
   * Método que verifica o email do usuário
   */
  @Get('/verify/email/:userId')
  @ApiOperation({ title: 'Método que verifica o email do usuário' })
  @ApiImplicitParam({ name: 'userId' })
  public async verifyUserEmail(@Request() nestRequest: NestJSRequest, @Param('userId') userId: string): Promise<CrudProxy<UserProxy>> {
    const user = await this.service.findOne({ where: { id: +userId } });

    if (!user)
      throw new NotFoundException('Usuário náo encontrado.');

    // TODO: sendVerificationCode
    user.isEmailConfirmed = true;

    return await this.service.repository.save(user).then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que retorna as informações do usuário que esteja logado
   *
   * @param nestRequest As informações da requisição do NestJS
   */
  @Get('/me')
  @ApiOkResponse({ description: 'Get info about user logged.', type: UserProxy })
  @UseInterceptors(CrudRequestInterceptor)
  @ProtectTo('user', 'admin')
  public async getMe(@Request() nestRequest: NestJSRequest): Promise<CrudProxy<UserProxy>> {
    const user = await this.service.findOne({ where: { id: nestRequest.user.id } });

    return mapCrud(UserProxy, user);
  }

  /**
   * Método que retorna várias informações da entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('admin')
  @Override()
  @ApiOkResponse({ type: UserProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<UserProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: UserProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<UserProxy>> {
    const userId = +nestRequest.params.id;

    if (userId !== nestRequest.user.id && !isAdminUser(nestRequest.user))
      throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');

    const { exists } = await this.service.exists([userId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: UserProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreateUserPayload): Promise<CrudProxy<UserProxy>> {
    const user = this.getEntityFromPayload(payload);
    const alreadyHasUser = await this.service.alreadyHasUserWith(user.email);

    if (alreadyHasUser)
      throw new BadRequestException('Já existe um usuário cadastrado com esse e-mail.');

    user.password = await this.service.getEncryptedPassword(user.password);
    user.roles = 'user';

    // send confirmation email
    // await this.service.sendConfirmEmail(user.id, user.email);

    return await this.base.createOneBase(crudRequest, user).then(response => mapCrud(UserProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: UserProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdateUserPayload): Promise<CrudProxy<UserProxy>> {
    const userId = +nestRequest.params.id;

    if ((+nestRequest.params.id) !== nestRequest.user.id && !isAdmin(nestRequest.user.roles))
      throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');

    const { exists } = await this.service.exists([userId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const user = this.getEntityFromPayload(payload, userId);

    return await this.service.repository.save(user).then(response => mapCrud(UserProxy, response));
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
  private getEntityFromPayload(payload: CreateUserPayload | UpdateUserPayload, id?: number, isUserAdmin: boolean = false): UserEntity {
    return new UserEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.name) && { name: payload.name },
      ...isValid(payload.cpf) && { cpf: payload.cpf },
      ...isValid(payload.description) && { description: payload.description },
      ...payload instanceof CreateUserPayload && { email: payload.email },
      ...payload instanceof CreateUserPayload && { password: payload.password },
    });
  }

  //#endregion

}
