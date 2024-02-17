import { WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GameGateway {
  private declare readonly server: Server;

  handleJoin = jest.fn();

  handleLeave = jest.fn();

  sendToRoom = jest.fn();
}
