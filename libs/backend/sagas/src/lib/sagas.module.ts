import { Global, Module } from '@nestjs/common';
import { CharacterSagas } from './characters/characters.sagas';
import { GameSagas } from './games/game.sagas';
import { VoteSagas } from './votes/votes.sagas';

@Global()
@Module({
  providers: [CharacterSagas, GameSagas, VoteSagas],
})
export class SagasModule {}
