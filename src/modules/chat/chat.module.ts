//#region Imports

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { ChatEntity } from '../../typeorm/entities/chat.entity';

//#endregion

@Module({
  controllers: [
    ChatController,
  ],
  providers: [
    ChatService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      ChatEntity,
    ]),
    UserModule,
  ],
  exports: [
    ChatService,
  ],
})
export class ChatModule {
}
