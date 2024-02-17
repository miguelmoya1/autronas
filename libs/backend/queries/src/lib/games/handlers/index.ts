import { GameGetAllHandler } from './game-get-all.handler';
import { GameGetRequestsHandler } from './game-get-requests.handler';
import { GameGetHandler } from './game-get.handler';

export const GameQueryHandlers = [GameGetHandler, GameGetAllHandler, GameGetRequestsHandler];
