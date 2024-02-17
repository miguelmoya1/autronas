import { Global, Module } from '@nestjs/common';
import { GameGateway } from './games/game.gateway';

@Global()
@Module({
  providers: [GameGateway],
  exports: [GameGateway],
})
export class GatewaysModule {}
