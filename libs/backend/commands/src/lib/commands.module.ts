import { Global, Module } from '@nestjs/common';
import { AuthCommandHandlers } from './auth/handlers';

const providers = [AuthCommandHandlers ?? []].flat();

@Global()
@Module({
  providers: [...providers],
})
export class CommandsModule {}
