import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    //  VoteSagas
  ],
})
export class SagasModule {}
