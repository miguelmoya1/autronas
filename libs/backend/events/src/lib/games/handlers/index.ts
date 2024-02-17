import { GameCharactersCreatedHandler } from './game-characters-created.handler';
import { GameCodeCreatedHandler } from './game-code-created.handler';
import { GameCreatedHandler } from './game-created.handler';
import { GameDeclinedHandler } from './game-declined.handler';
import { GameFinishedHandler } from './game-finished.handler';
import { GameJoinedHandler } from './game-joined.handler';
import { GamePhaseChangedHandler } from './game-phase-changed.handler';
import { GameStartedHandler } from './game-started.handler';
import { GameUserRequestedHandler } from './game-user-requested.handler';

export const GameEventHandlers = [
  GameCreatedHandler,
  GameUserRequestedHandler,
  GameJoinedHandler,
  GamePhaseChangedHandler,
  GameStartedHandler,
  GameCharactersCreatedHandler,
  GameCodeCreatedHandler,
  GameDeclinedHandler,
  GameFinishedHandler,
];
