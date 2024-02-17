import { CharacterCreateForGameHandler } from './character-create-from-games.handler';
import { CharacterKillByVotesHandler } from './character-kill-by-votes.handler';
import { CharacterKillByWitchHandler } from './character-kill-by-witch.handler';
import { CharacterReviveHandler } from './character-revive.handler';
import { CharacterSeerHandler } from './character-seer.handler';
import { CharacterWitchSkipHandler } from './character-witch-skip.handler';

export const CharacterCommandHandlers = [
  CharacterCreateForGameHandler,
  CharacterKillByVotesHandler,
  CharacterReviveHandler,
  CharacterKillByWitchHandler,
  CharacterWitchSkipHandler,
  CharacterSeerHandler,
];
