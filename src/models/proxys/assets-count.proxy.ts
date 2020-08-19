import { ApiModelProperty } from '@nestjs/swagger';

/**
 * A interface que diz a quantidade de assests do usuário
 */
export class AssetsCountProxy {
  /**
   * A quantidade de pdf do usuário
   */
  @ApiModelProperty()
  pdfCount: number;

  /**
   * A quantidade de video do usuário
   */
  @ApiModelProperty()
  videoCount: number;
}
