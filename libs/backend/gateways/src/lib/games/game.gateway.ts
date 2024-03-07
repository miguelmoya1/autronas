import { ShouldRefresh } from '@autronas/core/interfaces';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { of } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway {
  private readonly logger = new Logger(GameGateway.name);

  @WebSocketServer()
  private declare readonly server: Server;

  @SubscribeMessage('join')
  protected async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody('token') token: string,
    @MessageBody('gameID') gameID: string,
  ) {
    if (!gameID) {
      this.logger.error('INVALID_GAME_ID');
      throw new HttpException('INVALID_GAME_ID', HttpStatus.BAD_REQUEST);
    }

    if (!token) {
      this.logger.error('INVALID_TOKEN');
      throw new HttpException('INVALID_TOKEN', HttpStatus.BAD_REQUEST);
    }

    client.join(gameID);
    this.logger.debug(`joined to game ${gameID}`);

    return of({ event: 'join', data: 'success' });
  }

  @SubscribeMessage('leave')
  protected async handleLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody('token') token: string,
    @MessageBody('gameID') gameID: string,
  ) {
    if (!gameID) {
      throw new HttpException('INVALID_GAME_ID', HttpStatus.BAD_REQUEST);
    }

    if (!token) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.BAD_REQUEST);
    }

    client.leave(gameID);
    this.logger.debug(`left from game ${gameID}`);

    return { event: 'leave', data: 'success' };
  }

  async sendToRoom(gameID: string, data: ShouldRefresh) {
    this.logger.verbose(
      // `sending to game socket ${gameID}: event ${Events.GAME}`,
      'sending to game socket',
    );

    // this.server.to(gameID).emit(Events.GAME, data);
  }
}
