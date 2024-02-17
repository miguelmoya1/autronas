import { Global, Module } from '@nestjs/common';
import { AuthQueryHandlers } from './auth/handlers';
import { TranslateQueryHandlers } from './translate/handlers';
import { UserQueryHandlers } from './users/handlers';

const providers = [
  AuthQueryHandlers ?? [],
  TranslateQueryHandlers ?? [],
  UserQueryHandlers ?? [],
].flat();

@Global()
@Module({
  providers: [...providers],
})
export class QueriesModule {}
