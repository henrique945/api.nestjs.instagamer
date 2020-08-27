import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthTokenModule } from './modules/auth/auth-token.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvModule } from './modules/env/env.module';

import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    EnvModule,
    AuthModule,
    AuthTokenModule,
    UserModule,
    GameModule,
  ],
  providers: [
    EnvModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
}
