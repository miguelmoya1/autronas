import { CharacterKilledHandler } from './character-killed.handler';
import { CharacterRevivedHandler } from './character-revived.handler';
import { CharacterSeenHandler } from './character-seen.handler';
import { CharacterWitchSkippedHandler } from './character-witch-skipped.handler';

export const CharacterEventHandlers = [
  CharacterKilledHandler,
  CharacterRevivedHandler,
  CharacterWitchSkippedHandler,
  CharacterSeenHandler,
];
