import { AuthIsLoggedHandler } from './auth-is-logged.handler';
import { AuthRehydrateHandler } from './auth-rehydrate.handler';

export const AuthQueryHandlers = [AuthIsLoggedHandler, AuthRehydrateHandler];
