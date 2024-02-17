import { Injectable, inject } from '@angular/core';
import { GameCreate } from '@sleep-valley/core/interfaces';
import { GameApiService } from './game-api.service';

@Injectable({
  providedIn: 'root',
})
export class GameDtoService {
  private readonly _gamesApiService = inject(GameApiService);

  public async create(data: GameCreate) {
    const response = await this._gamesApiService.create(data);

    return response.isOk();
  }

  public async join(code: string) {
    const response = await this._gamesApiService.join(code);

    return response.isOk();
  }

  public async start(gameID: string) {
    const response = await this._gamesApiService.start(gameID);

    return response.isOk();
  }

  public async accept(gameID: string, userID: string) {
    const response = await this._gamesApiService.accept(gameID, userID);

    return response.isOk();
  }

  public async decline(gameID: string, userID: string) {
    const response = await this._gamesApiService.decline(gameID, userID);

    return response.isOk();
  }
}
