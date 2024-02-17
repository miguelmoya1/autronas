import { Injectable, effect, inject, untracked } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Subscription } from 'rxjs';
import { VoteApiService } from './vote-api.service';
import { VoteSocketService } from './vote-socket.service';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private readonly _votesApiService = inject(VoteApiService);
  private readonly _voteSocketService = inject(VoteSocketService);
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
    this._store.set(STORE_KEYS.CURRENT_VOTE, defaultDataLoading());

    await this.setValue(gameID);

    this.watchSocket(gameID);
  }

  private unwatch() {
    this._store.set(STORE_KEYS.CURRENT_VOTE, defaultDataLoading());

    this.subscription?.unsubscribe();
  }

  private async setValue(gameID: string) {
    const response = await this._votesApiService.getMeInGame(gameID);

    this._store.set(STORE_KEYS.CURRENT_VOTE, response.serialize());
  }

  private watchSocket(gameID: string) {
    this.subscription?.unsubscribe();

    this.subscription = this._voteSocketService.voteSUpdated.subscribe(async () => {
      await this.setValue(gameID);
    });
  }
}
