import { Injectable, effect, inject, untracked } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Subscription } from 'rxjs';
import { CharacterApiService } from './character-api.service';
import { CharacterSocketService } from './character-socket.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersGameService {
  private readonly _charactersApiService = inject(CharacterApiService);
  private readonly _characterSocketService = inject(CharacterSocketService);
  private readonly _store = inject(StoreService);

  private subscription?: Subscription;

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
    this._store.set(STORE_KEYS.CHARACTERS, defaultDataLoading());

    await this.setValue(gameID);

    this.watchSocket(gameID);
  }

  private unwatch() {
    this._store.set(STORE_KEYS.CHARACTERS, defaultDataLoading());

    this.subscription?.unsubscribe();
  }

  private async setValue(gameID: string) {
    const response = await this._charactersApiService.getAllInGame(gameID);

    this._store.set(STORE_KEYS.CHARACTERS, response.serialize());
  }

  private watchSocket(gameID: string) {
    this.subscription?.unsubscribe();

    this.subscription = this._characterSocketService.charactersUpdated.subscribe(async () => {
      await this.setValue(gameID);
    });
  }
}
