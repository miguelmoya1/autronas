import { Global, Module } from '@nestjs/common';
import { AuthCommandHandlers } from './auth/handlers';
import { ClientsCommandHandlers } from './clients/handlers';

const providers = [
  AuthCommandHandlers ?? [],
  ClientsCommandHandlers ?? [],
].flat();

@Global()
@Module({
  providers: [...providers],
})
export class CommandsModule {}
