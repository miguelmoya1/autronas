import { VoteClearHandler } from './vote-clear.handler';
import { VoteConfirmHandler } from './vote-confirm.handler';
import { VoteHandler } from './vote.handler';

export const VoteCommandHandlers = [VoteHandler, VoteClearHandler, VoteConfirmHandler];
