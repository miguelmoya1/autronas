import { Global, Module } from '@nestjs/common';
import { AuthCommandHandlers } from './auth/handlers';
import { CharacterCommandHandlers } from './characters/handlers';
import { GameCommandHandlers } from './games/handler';
import { VoteCommandHandlers } from './votes/handlers';

const providers = [
  AuthCommandHandlers ?? [],
  CharacterCommandHandlers ?? [],
  GameCommandHandlers ?? [],
  VoteCommandHandlers ?? [],
].flat();

@Global()
@Module({
  providers: [...providers],
})
export class CommandsModule {}
