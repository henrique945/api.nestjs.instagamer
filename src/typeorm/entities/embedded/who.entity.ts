//#region Imports

import { Column } from 'typeorm';

//#endregion

/**
 * Entidade que pode ser usada para dizer 'quem' é um entidade
 * Contendo os campos nome e descrição da entidade
 */
export class WhoEntity {

  //#region Constructors

  /**
   * Construtor Padrão
   */
  constructor(partial: Partial<WhoEntity>) {
    Object.assign(this, partial);
  }

  //#endregion

  //#region Properties

  /**
   * O nome da entidade
   */
  @Column({ nullable: false })
  public name: string;

  /**
   * A descrição da entidade
   */
  @Column({ nullable: true })
  public description?: string;

  //#endregion

}
