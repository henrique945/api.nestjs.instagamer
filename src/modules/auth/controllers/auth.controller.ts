//#region Imports

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';

import { TokenProxy } from '../../../models/proxys/token.proxy';
import { NestJSRequest } from '../../../utils/type.shared';
import { LoginPayload } from '../models/login.payload';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';

//#endregion

/**
 * A classe que representa o construtor que lida com as autenticações
 */
@ApiUseTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna o token do usuário
   *
   * @param req As informações da requisição
   * @param payload As informações para o login
   */
  @ApiOkResponse({ description: 'O usuário foi logado com sucesso', type: TokenProxy })
  @ApiUnauthorizedResponse({ description: 'A senha digitada está incorreta.' })
  @ApiNotFoundResponse({ description: 'Não foi encontrado um usuário com esse e-mail.' })
  @UseGuards(AuthGuard('local'))
  @Post('/local')
  public async login(@Request() req: NestJSRequest, @Body() payload: LoginPayload): Promise<TokenProxy> {
    if (!req.user.isEmailConfirmed)
      throw new BadRequestException('Confirmação de e-mail necessária!');

    // TODO: send email with code
    // await this.userService.send2FactoryAuth(req.user.id, payload.username);

    return await this.authService.signIn(req.user);
  }

  //#endregion

}
