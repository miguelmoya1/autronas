import { Global, Module } from '@nestjs/common';
import { AuthQueryHandlers } from './auth/handlers';
import { CharacterQueryHandlers } from './characters/handlers';
import { GameQueryHandlers } from './games/handlers';
import { TranslateQueryHandlers } from './translate/handlers';
import { UserQueryHandlers } from './users/handlers';
import { VoteQueryHandlers } from './votes/handlers';

const providers = [
  AuthQueryHandlers ?? [],
  CharacterQueryHandlers ?? [],
  GameQueryHandlers ?? [],
  TranslateQueryHandlers ?? [],
  VoteQueryHandlers ?? [],
  UserQueryHandlers ?? [],
].flat();

@Global()
@Module({
  providers: [...providers],
})
export class QueriesModule {}
