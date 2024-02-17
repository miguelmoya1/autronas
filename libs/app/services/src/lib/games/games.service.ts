import { Injectable, inject } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { GameApiService } from './game-api.service';
import { GameSocketService } from './game-socket.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly _gamesApiService = inject(GameApiService);
  private readonly _gameSocketService = inject(GameSocketService);
  private readonly _store = inject(StoreService);

  constructor() {
    this.loadAll();
    this.watchSocket();
  }

  public async loadAll() {
    this._store.set(STORE_KEYS.GAMES, defaultDataLoading());

    const response = await this._gamesApiService.getAll();

    this._store.set(STORE_KEYS.GAMES, response.serialize());

    return response.isOk();
  }

  private watchSocket() {
    this._gameSocketService.gamesUpdated.subscribe(async () => {
      await this.loadAll();
    });
  }
}
