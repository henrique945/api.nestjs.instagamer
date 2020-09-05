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

import { ChatEntity } from '../../../typeorm/entities/chat.entity';
import { ChatService } from '../services/chat.service';
import { UserService } from '../../user/services/user.service';
import { ChatProxy } from '../models/chat.proxy';
import { CreateChatPayload } from '../models/create-chat.payload';
import { UpdateChatPayload } from '../models/update-chat.payload';

//#endregion

/**
 * A classe que representa o controlador que lida com as conversas
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: ChatEntity,
  },
  query: {
    join: {
      messageSent: {
        exclude: ['password'],
      },
      messageReceived: {
        exclude: ['password'],
      },
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
@ApiUseTags('chat')
@Controller('chat')
export class ChatController extends BaseCrudController<ChatEntity, ChatService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: ChatService,
    private readonly userService: UserService,
  ) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  @Get('/list')
  @ProtectTo('user', 'admin')
  @ApiOperation({ title: 'Lista todos os chats do usuário.' })
  public async listUserChats(@Request() nestRequest: NestJSRequest): Promise<CrudProxy<ChatProxy>> {
    const chats = await this.service.find({
      where: [
        {
          messageSentId: +nestRequest.user.id,
        },
        {
          messageReceivedId: +nestRequest.user.id,
        },
      ],
      order: { createdAt: 'ASC' },
    });

    return mapCrud(ChatProxy, chats);
  }

  /**
   * Método que retorna várias informações da entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('admin')
  @Override()
  @ApiOkResponse({ type: ChatProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<ChatProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(ChatProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: ChatProxy })
  public async getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<ChatProxy>> {
    const chatId = +nestRequest.params.id;

    const { exists } = await this.service.exists([chatId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    return await this.base.getOneBase(crudRequest).then(response => mapCrud(ChatProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ApiOkResponse({ type: ChatProxy })
  public async createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @Body() payload: CreateChatPayload): Promise<CrudProxy<ChatProxy>> {
    const chat = this.getEntityFromPayload(payload);

    const userSentExists = await this.userService.exists([chat.messageSentId]);

    if (!userSentExists)
      throw new NotFoundException('Usuário que envia a mensagem não encontrado.');

    const userReceivedExists = await this.userService.exists([chat.messageReceivedId]);

    if (!userReceivedExists)
      throw new NotFoundException('Usuário que recebe a mensagem não encontrado.');

    return await this.base.createOneBase(crudRequest, chat).then(response => mapCrud(ChatProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('user', 'admin')
  @Override()
  @ApiOkResponse({ type: ChatProxy })
  public async replaceOne(@Request() nestRequest: NestJSRequest, @Body() payload: UpdateChatPayload): Promise<CrudProxy<ChatProxy>> {
    const chatId = +nestRequest.params.id;

    const { exists } = await this.service.exists([chatId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    const chat = this.getEntityFromPayload(payload, chatId);

    const userSentExists = await this.userService.exists([chat.messageSentId]);

    if (!userSentExists)
      throw new NotFoundException('Usuário que envia a mensagem não encontrado.');

    const userReceivedExists = await this.userService.exists([chat.messageReceivedId]);

    if (!userReceivedExists)
      throw new NotFoundException('Usuário que recebe a mensagem não encontrado.');

    return await this.service.repository.save(chat).then(response => mapCrud(ChatProxy, response));
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
  private getEntityFromPayload(payload: CreateChatPayload | UpdateChatPayload, id?: number, isUserAdmin: boolean = false): ChatEntity {
    return new ChatEntity({
      ...isValid(id) && { id },
      ...isValid(payload.isActive) && { isActive: payload.isActive },
      ...isValid(payload.messageSentId) && { messageSentId: payload.messageSentId },
      ...isValid(payload.messageReceivedId) && { messageReceivedId: payload.messageReceivedId },
      ...isValid(payload.message) && { message: payload.message },
    });
  }

  //#endregion

}
