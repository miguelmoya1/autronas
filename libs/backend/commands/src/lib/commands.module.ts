import { Global, Module } from '@nestjs/common';

const providers = [
  // AuthCommandHandlers ?? [],
].flat();

@Global()
@Module({
  providers: [...providers],
})
export class CommandsModule {}
