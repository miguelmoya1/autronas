import { Injectable, effect, inject, untracked } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Subscription } from 'rxjs';
import { GameApiService } from './game-api.service';
import { GameSocketService } from './game-socket.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public requireAnimation = false;

  private readonly _store = inject(StoreService);
  private readonly _gameSocketService = inject(GameSocketService);
  private readonly _gamesApiService = inject(GameApiService);

  private declare _subscription?: Subscription;

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
    this._store.set(STORE_KEYS.CURRENT_GAME, defaultDataLoading());

    await this.setGame(gameID);

    this.watchSocket();
  }

  private unwatch() {
    this._subscription?.unsubscribe();

    this._store.set(STORE_KEYS.CURRENT_GAME, defaultDataLoading());

    this.requireAnimation = false;
  }

  private watchSocket() {
    this._subscription?.unsubscribe();

    this._subscription = this._gameSocketService.gameUpdated.subscribe(async () => {
      const gameID = this._store.get(STORE_KEYS.CURRENT_GAME)().data?.id;

      if (gameID) {
        this.requireAnimation = true;
        await this.setGame(gameID);
      }
    });
  }

  private async setGame(gameID: string) {
    const response = await this._gamesApiService.get(gameID);

    this._store.set(STORE_KEYS.CURRENT_GAME, response.serialize());
  }
}
