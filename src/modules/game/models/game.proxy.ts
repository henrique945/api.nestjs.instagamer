//#region Imports

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GameEntity } from '../../../typeorm/entities/game.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um jogo
 */
export class GameProxy extends BaseCrudProxy {

  /**
   * O nome do usuário
   */
  public name: string;

  /**
   * A descrição do jogo
   */
  public description: string;

  /**
   * A imagem título do jogo
   */
  public titleImage: string;

  /**
   * A lista de imagens do jogo
   */
  public listImages: string[];

  /**
   * Construtor padrão
   */
  constructor(
    entity: GameEntity,
  ) {
    super(entity);

    this.name = entity.name;
    this.description = entity.description;
    this.listImages = entity.listImages;
    this.titleImage = entity.titleImage;
  }
}
