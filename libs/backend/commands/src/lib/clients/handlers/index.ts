import { ClientCreateHandler } from './client-create.handler';
import { ClientUpdateHandler } from './client-update.handler';

export const AuthCommandHandlers = [ClientCreateHandler, ClientUpdateHandler];
