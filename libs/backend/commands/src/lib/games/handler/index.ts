import { GameCreateHandler } from './game-create.handler';
import { GameDeclineHandler } from './game-decline.handler';
import { GameGenerateCodeHandler } from './game-generate-code.handler';
import { GameJoinHandler } from './game-join.handler';
import { GameRequestJoinFromCodeHandler } from './game-request-join-from-code.handler';
import { GameStartHandler } from './game-start.handler';
import { GameTryChangePhaseHandler } from './game-try-change-phase.handler';
import { GameTryFinishHandler } from './game-try-finish.handler';

export const GameCommandHandlers = [
  GameCreateHandler,
  GameGenerateCodeHandler,
  GameRequestJoinFromCodeHandler,
  GameJoinHandler,
  GameStartHandler,
  GameTryChangePhaseHandler,
  GameDeclineHandler,
  GameTryFinishHandler,
];
