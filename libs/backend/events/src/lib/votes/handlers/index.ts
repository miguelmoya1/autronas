import { VoteClearedHandler } from './vote-cleared.handler';
import { VoteConfirmedHandler } from './vote-confirmed.handler';
import { VoteCreatedHandler } from './vote-created.handler';

export const VoteEventHandlers = [VoteCreatedHandler, VoteConfirmedHandler, VoteClearedHandler];
