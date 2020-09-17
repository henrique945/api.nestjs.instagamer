//#region Imports

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import * as xss from 'xss';

import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { TypeOrmValueTypes } from '../../../models/enums/type-orm-value.types';
import { VerifyProxy } from '../../../models/proxys/verify.proxy';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { EnvService } from '../../env/services/env.service';
import { emailHtml } from '../../../models/html/email.html';

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

//#endregion

/**
 * A classe que representa o serviço que lida com os usuários
 */
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(UserEntity) public repository: Repository<UserEntity>,
    private readonly env: EnvService,
  ) {
    super(repository);
  }

  //#endregion

  //#region Public Methods

  /**
   * Envia um email de confirmação para o usuário
   */
  public async sendConfirmEmail(id: number, email: string): Promise<void> {
    sgMail.setApiKey(this.env.SENDGRID_API_KEY);

    const msg = {
      to: `${email}`,
      from: 'instagamer.social@hotmail.com',
      subject: 'Bem vindo ao Instagamer',
      text: 'Bem vindo ao Instagamer',
      html: emailHtml(),
    };
    await sgMail.send(msg);
  }

  /**
   * Método que verifica se algumas entidades existem
   *
   * @param ids A lista de identificações das entidades
   */
  public async exists(ids: number[]): Promise<VerifyProxy> {
    const count = await this.repository.createQueryBuilder().whereInIds(ids).getCount();

    return new VerifyProxy(count === ids.length);
  }

  /**
   * Método que retorna as informações de uma entidade
   */
  public async get(requestUser: UserEntity, entityId: number): Promise<UserEntity> {
    const { exists } = await this.exists([entityId]);

    if (!exists)
      throw new NotFoundException('A entidade procurada não existe.');

    let user: UserEntity;

    user = await this.repository.findOne({ where: { id: entityId, isActive: TypeOrmValueTypes.TRUE } });

    return user;
  }

  /**
   * Método que verifica se já existe um usuário com um determinado e-mail
   *
   * @param email O e-mail a ser verificado
   * @param ignoreUserId A identificação do usuário que deve ignorar
   */
  public async alreadyHasUserWith(email: string, ignoreUserId: number = 0): Promise<boolean> {
    return await this.repository.createQueryBuilder('user')
      .where('user.email = :email AND user.id != :ignoreUserId', { email, ignoreUserId })
      .getCount()
      .then(count => count > 0);
  }

  /**
   * Método que retorna um usuário pelo e-mail dele
   *
   * @param email O e-mail do usuário
   */
  public async findByEmail(email: string): Promise<UserEntity> {
    const cleanedEmail = this.getCleanedEmail(email);
    const user = await this.repository.findOne({ where: { email: cleanedEmail, isActive: TypeOrmValueTypes.TRUE } });

    if (!user)
      throw new NotFoundException('O usuário não existe ou foi deletado.');

    return user;
  }

  /**
   * Método que encontra um usuário para a validação de autenticação
   *
   * @param email O e-mail do usuário
   */
  public async findByEmailForAuth(email: string): Promise<Partial<UserEntity>> {
    const cleanedEmail = this.getCleanedEmail(email);
    const user = await this.repository.findOne({ where: { email: cleanedEmail, isActive: TypeOrmValueTypes.TRUE } });

    if (!user)
      throw new UnauthorizedException('A senha ou o e-mail enviado estão incorretos.');

    return user;
  }

  /**
   * Método que retorna um usuário baseado no seu id
   *
   * @param id A identificação do usuário
   */
  public async findById(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { id, isActive: TypeOrmValueTypes.TRUE } });

    if (!user)
      throw new NotFoundException('O usuário não existe ou foi deletado.');

    return user;
  }

  /**
   * Método que encripta a senha do usuário
   *
   * @param plainPassword A senha em texto puro
   */
  public async getEncryptedPassword(plainPassword: string): Promise<string> {
    const salt = await bcryptjs.genSalt();

    return await bcryptjs.hash(plainPassword, salt);
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que limpa o e-mail de qualquer ataque ou problema
   *
   * @param email O endereço de e-mail
   */
  private getCleanedEmail(email: string): string {
    return xss.filterXSS(email.trim().toLocaleLowerCase());
  }

  //#endregion

}
