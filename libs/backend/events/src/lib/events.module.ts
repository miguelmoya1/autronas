import { Global, Module } from '@nestjs/common';
import { CharacterEventHandlers } from './characters/handlers';
import { GameEventHandlers } from './games/handlers';
import { UserEventHandlers } from './users/handlers';
import { VoteEventHandlers } from './votes/handlers';

const providers = [
  CharacterEventHandlers ?? [],
  GameEventHandlers ?? [],
  UserEventHandlers ?? [],
  VoteEventHandlers ?? [],
].flat();

@Global()
@Module({
  providers: [...providers],
})
export class EventsModule {}
