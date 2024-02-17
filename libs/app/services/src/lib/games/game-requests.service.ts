import { Injectable, effect, inject, untracked } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Subscription } from 'rxjs';
import { GameApiService } from './game-api.service';
import { GameSocketService } from './game-socket.service';

@Injectable({
  providedIn: 'root',
})
export class GameRequestsService {
  private readonly _gameApiService = inject(GameApiService);
  private readonly _gameSocketService = inject(GameSocketService);
  private readonly _store = inject(StoreService);
  private _subscription?: Subscription;

  constructor() {
    effect(() => {
      const gameID = this._store.get(STORE_KEYS.GAME_ID)();

      untracked(() => {
        if (gameID) {
          this.watch(gameID);
        } else {
          this.unwatch();
        }
      });
    });
  }

  private async watch(gameID: string) {
    this._store.set(STORE_KEYS.GAME_REQUESTS, defaultDataLoading());

    await this.setValue(gameID);

    this.watchSocket(gameID);
  }

  private unwatch() {
    this._store.set(STORE_KEYS.GAME_REQUESTS, defaultDataLoading());

    this._subscription?.unsubscribe();
  }

  private async setValue(gameID: string) {
    const response = await this._gameApiService.getRequests(gameID);

    this._store.set(STORE_KEYS.GAME_REQUESTS, response.serialize());
  }

  private watchSocket(gameID: string) {
    this._subscription?.unsubscribe();

    this._subscription = this._gameSocketService.gameUpdated.subscribe(async () => {
      await this.setValue(gameID);
    });
  }
}
